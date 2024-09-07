const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection
const { authenticateToken } = require('../middlewares/authMiddleware'); // Import the middleware

const status = Object.freeze({
  AVAILABLE: Symbol('AVAILABLE'),
  RESERVED: Symbol('RESERVED')
})

router.post('/', authenticateToken, async (req, res) => {
  const { carID, custID, discountID, totCost } = req.body;
  console.log('[INFO] Received POST request to /api/orders', req.body);

  if (!carID || !custID) {
      res.status(400).json({ success: false, error: 'Missing important fields!' });
      return;
  }

  try {
      // Begin transaction
      db.beginTransaction(async (err) => {
          if (err) {
              throw err;
          }

          try {

             // Get today's date
             const today = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

              // Check if the car is available in carStatus
              const statusQuery = 'SELECT status FROM carStatus WHERE carID = ? FOR UPDATE';
              const carStatus = await new Promise((resolve, reject) => {
                  db.query(statusQuery, [carID], (err, result) => {
                      if (err) reject(err);
                      resolve(result[0]);
                  });
              });

              if (carStatus?.status !== "AVAILABLE") {
                throw new Error('Car is not available');
              }

              // Update car status to RESERVED
              const updateStatusQuery = 'UPDATE carStatus SET status = "RESERVED" WHERE carID = ?';
              await new Promise((resolve, reject) => {
                  db.query(updateStatusQuery, [carID], (err) => {
                      if (err) reject(err);
                      resolve();
                  });
              });



              // Fetch a random assistant from the tripAsst table
              const assignAsstQuery = 'SELECT * FROM tripAsst WHERE tripAsst.deleted_at IS NULL ORDER BY RAND() LIMIT 1';
              const assistant = await new Promise((resolve, reject) => {
                  db.query(assignAsstQuery, (err, result) => {
                      if (err) reject(err);
                      resolve(result[0]);
                  });
              });

              if (!assistant) {
                  throw new Error('No available assistant');
              }

              const asstID = assistant.asstID;
              const orderDate = new Date().toISOString().split('T')[0];

              // Insert into rentalOrder table
              const insertOrderQuery = 'INSERT INTO rentalOrder (carID, custID, asstID, discountID, totCost, orderDate) VALUES (?, ?, ?, ?, ?, ?)';
              const values = [carID, custID, asstID, discountID, totCost, orderDate];

              const orderResult = await new Promise((resolve, reject) => {
                  db.query(insertOrderQuery, values, (err, result) => {
                      if (err) reject(err);
                      resolve(result);
                  });
              });

              // Commit transaction if all is good
              db.commit((err) => {
                  if (err) {
                      db.rollback(() => {
                          throw err;
                      });
                  }

                  console.log('[INFO] Order created successfully');
                  res.status(201).json({ success: true, order: orderResult });
              });
          } catch (error) {
              // Rollback transaction on error
              db.rollback(() => {
                  console.error('[ERROR] Transaction failed:', error.message);
                  res.status(500).json({ success: false, error: 'Internal Server Error' });
              });
          }
      });
  } catch (error) {
      console.error('[ERROR] Error creating order:', error.message);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});




module.exports = router;
