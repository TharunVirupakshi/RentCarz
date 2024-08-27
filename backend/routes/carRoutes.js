const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const db = require('../config/db'); // Import the database connection

// Route to get all cars
router.get('/', (req, res) => {
    // SQL query to select all cars from the 'car' table
    console.log(`[INFO] Received GET request to /api/cars`);

    const sql = 'SELECT * FROM car, location WHERE car.locationID = location.locationID AND car.deleted_at IS NULL';

    // Perform SQL database query
    db.query(sql, (err, result) => {
        if (err) {
            console.error(`[ERROR] Error fetching cars from MySQL: ${err.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // console.log('Cars fetched from MySQL:', result);
            console.log(`[INFO] Successfully fetched ${result.length} cars from MySQL`);
            res.json(result);
        }
    });
});

// Route to get a specific car by vehicle number
router.get('/:vehicleNo', (req, res) => {
    const vehicleNo = req.params.vehicleNo;
    console.log(`[INFO] Received GET request to /api/cars/${vehicleNo}`);

    const sql = `SELECT * FROM car, location WHERE car.vehicleNo = ? AND car.locationID = location.locationID AND car.deleted_at IS NULL`;

    // Perform SQL database query
    db.query(sql, [vehicleNo], (err, result) => {
        if (err) {
            console.error(`[ERROR] Error fetching car with vehicle number ${vehicleNo} from MySQL: ${err.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length == 0) {
                console.log(`[ERROR] No car found with vehicle number ${vehicleNo}`);
                res.status(404).json({ error: 'No car found with the specified vehicle number' });
            } else {
                console.log(`[INFO] Successfully fetched car with vehicle number ${vehicleNo} from MySQL`);
                res.json(result);
            }
        }
    });
});

router.post('/', (req, res)=>{
    const {vehicleNo, carType, model, locationID, photoUrl } = req.body
    console.log('[INFO] Received POST request to /api/cars')
    console.log('[INFO] Request body:', req.body);

     // Check if any of the values are empty strings
     if (!vehicleNo || !carType || !model || !locationID) {
        console.log('[ERROR] Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    if(vehicleNo === '' || carType === '' || model === ''){
        console.log('[ERROR] One or more required fields are empty strings');
        return res.status(400).json({ error: 'Missing required fields' }); 
    }
  
     // Check if the locationID has deleted_at set
    const checkLocationQuery = 'SELECT * FROM location WHERE locationID = ? AND deleted_at IS NOT NULL';
    db.query(checkLocationQuery, [locationID], (locationErr, locationResult) => {
        if (locationErr) {
            console.error('[ERROR] Error checking location:', locationErr.message);
            return res.status(500).json({ error: locationErr.message });
        }

        if (locationResult.length > 0) {
            console.log('[ERROR] The location no longer exists, please add a different location');
            return res.status(400).json({ error: 'The location no longer exists, please add different location' });
        }

        // Proceed with inserting the car
        const sql = 'INSERT INTO car (vehicleNo, carType, model, locationID, photoUrl) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [vehicleNo, carType, model, locationID, photoUrl], (err, result) => {
            if (err) {
                console.error('[ERROR] Error adding car:', err.message);
                return res.status(500).json({ error: err.message });
            }
            // console.log('[INFO] Car added successfully:', result);
            res.json({ success: true, message: 'Added car!' });
        });
    });
})

router.put('/:vehicleNo',(req, res) =>{
    const {vehicleNo, carType, model, locationID, photoUrl } = req.body

    console.log('[INFO] Received PUT request to /api/cars')
    console.log('[INFO] Request body:', req.body);

     // Check if any fields are sent in the request body
     if (!carType && !model && !locationID && !photoUrl) {
        console.log('[ERROR] No fields to update'); 
        return res.status(400).json({ error: 'No fields to update' });
    }

      // Validate that none of the fields are empty
      if ((carType && carType.trim() === '') ||
          (model && model.trim() === '') ||
          (locationID && locationID === '')) {
              return res.status(400).json({
                  error: 'Fields cannot be empty'
              });
      }


      

    // Construct the SQL query dynamically based on the fields sent
    let sql = 'UPDATE car SET ';
    const values = [];


    if (carType) {
        sql += 'carType=?, ';
        values.push(carType);
    }
    if (model) {
        sql += 'model=?, ';
        values.push(model);
    }



    if (locationID) {
        // Check if the locationID exists and is not deleted
        const checkLocationQuery = 'SELECT * FROM location WHERE locationID = ? AND deleted_at IS NULL';
        db.query(checkLocationQuery, [locationID], (locationErr, locationResult) => {
            if (locationErr) {
                console.error('[ERROR] Error checking location:', locationErr.message);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (locationResult.length === 0) {
                return res.status(400).json({ error: 'The location is deleted or does not exist, please choose different location' });
            }

            // If location is valid, add locationID to the query
            sql += 'locationID=?, ';
            values.push(locationID);
        })
    }

    if (photoUrl){
        sql += 'photoUrl=?, ';
        values.push(photoUrl);
    }
    // Remove the trailing comma and space
    sql = sql.slice(0, -2);

    // Add the WHERE clause
    sql += ' WHERE vehicleNo=? AND car.deleted_at IS NULL;';
    values.push(vehicleNo);


    // Perform the database update
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('[ERROR] Error updating car with vehicle number', vehicleNo, ':', err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        console.log('[INFO] Car updated successfully with vehicle number:', vehicleNo);
        res.json({ message: 'Car updated successfully' });
    });

})

router.delete('/:vehicleNo', (req, res) => {
    const { vehicleNo } = req.query;
    console.log('[INFO] Received DELETE request to /api/cars/' + vehicleNo);

    const softDeleteCarSQL = `
        UPDATE car
        SET deleted_at = NOW()
        WHERE vehicleNo = ? AND car.deleted_at IS NULL;
    `;

    db.query(softDeleteCarSQL, [vehicleNo], (err, result) => {
        if (err) {
            console.error('[ERROR] Error deleting car with vehicle number', vehicleNo, ':', err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.affectedRows === 0) {
                console.log('[INFO] No car found with the specified vehicle number:', vehicleNo);
                res.status(404).json({ error: 'No car found with the specified vehicle number' });
            } else {
                console.log('[INFO] Car deleted successfully with vehicle number:', vehicleNo);
                res.json({ message: 'Car deleted successfully' });
            }
        }
    });
})


module.exports = router;
