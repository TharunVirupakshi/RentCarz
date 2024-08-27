const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Import the database connection
const { authenticateToken } = require('../middlewares/authMiddleware'); // Import the middleware


router.post('/', authenticateToken ,async(req, res)=>{
    try {
        const { orderID, custID, totCost, paymentMethod } = req.body; 

        if(!orderID || !custID || !totCost || !paymentMethod){
            res.status(400).json({success: false, error: "Missing fields!"})
            return;
        }

        const transaction_query = "INSERT INTO transaction (transcName, amount) VALUES(? ,? )"
        
        const sql = 'INSERT INTO payment (amount, payment_method, date, orderID, transactionID, payerID, isSuccess) VALUES(?, ?, ?, ?, ?, ?, ?)'
        const orderDate = new Date();
        
        db.query(transaction_query,['cust_payment', totCost], (err, result)=>{
            if(err){
                const values = [totCost, paymentMethod, orderDate, orderID, null, custID, false]
                db.query(sql, values, (err, result) => {
                    if(err){
                        console.error('Error processing payment', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                    }
                })

                console.error('Error processing payment, transaction failure:', err.message);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            }else{
                const tran_ID = result.insertId
                const values = [totCost, paymentMethod, orderDate, orderID, tran_ID, custID, true]
                db.query(sql, values, (err, result) => {
                    if(err){
                        console.error('Error processing payment', err.message);
                        res.status(500).json({ success: false, error: 'Internal Server Error' });
                    }else{
                        res.status(201).json({ success: true, payment: result });

                    }
                })
            }
        } )

    } catch (error) {
        console.error('Error processing payment:', error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
})

module.exports = router;