const express = require('express');
const router = express.Router();
const db = require('../../config/db'); // Import the database connection

router.get('/', (req, res)=>{

    const sql = 'SELECT * FROM discount WHERE discount.deleted_at IS NULL'

    db.query(sql, (err, result)=>{
        if (err) {
            console.error(`Error fetching coupons:`, err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (result.length === 0) {
                // Coupon does not exist
                console.log('Coupons not found.');
                res.status(404).json({ error: 'Coupons not found' });
            } else {
                // Coupon exists
                console.log('Coupons fetched from MySQL:', result);
                res.json(result);
            }
        }
    })
})