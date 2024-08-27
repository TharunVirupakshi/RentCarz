const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection
const { authenticateToken } = require('../middlewares/authMiddleware'); // Import the middleware

router.post('/', authenticateToken ,async(req, res)=>{
    try {
        const { carID, custID, discountID, totCost } = req.body;
        console.log('[INFO] Received POST request to /api/orders', req.body)
        if(!carID || !custID ){
           res.status(400).json({success: false, error: 'Missing important feilds!'})
           return
        }

        const sql = 'INSERT INTO rentalOrder (carID, custID, asstID, discountID, totCost, orderDate) VALUES(?,?,?,?,?,?)'
       
        // Assign tripAsst
          // Fetch a random assistant from the tripAsst table
        const assignAsst = 'SELECT * FROM tripAsst WHERE tripAsst.deleted_at IS NULL ORDER BY RAND() LIMIT 1';

        db.query(assignAsst, (err, result) => {
            if (err) {
                    console.error('Error assigning trip assistant:', err.message);
                    res.status(500).json({ success: false, error: 'Internal Server Error' });
                } else {
                    const assistant = result[0]; // Assuming the result is an array, and you want the first assistant
                    const asstID = assistant ? assistant.asstID : null;
                    console.log('Assigned asst: ', asstID)
                    if(asstID){
                       // Generate current timestamp formatted for SQL date type
                    const orderDate = new Date().toISOString().split('T')[0];
                    const values = [carID, custID, asstID, discountID, totCost, orderDate]
                    db.query(sql,values , (err, result) => {
                        if (err) {
                        console.error('[ERROR] Error creating order:', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                        } else {
                        res.status(201).json({ success: true, order: result });
                        }
                    });
                    }else{
                       res.status(500).json({ success: false, error: 'Internal Server Error' }); 
                    }

                } 
        }
        )

       
     
      } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }

})



module.exports = router;
