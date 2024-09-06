const mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootpass",
    database: 'CarRentalDB',
});

db.connect(function (err) {
    if (err) throw err;
    console.log(`[INFO] Connected to MySQL`);
});

// Gracefully handle connection errors
db.on('error', (err) => {
    console.error(`[ERROR] MySQL connection error: ${err.message}`);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Reconnect if the connection is lost
        console.error('[ERROR] MySQL connection was lost, reconnecting...');
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db;