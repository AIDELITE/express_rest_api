const mysql = require('mysql2');

//Create a connection to the database
const connection = mysql.createConnection({
    host: 'db_service', // Or the container IP if needed
    port: 3306,        // Change if using a different port
    user: 'root',
    password: 'root1',
    database: 'express_db'
});

// const connection = mysql.createConnection({
//     host: 'localhost', // Or the container IP if needed     // Change if using a different port
//     user: 'root',
//     password: '',
//     database: 'express_db'
// });

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
    });

module.exports = connection;