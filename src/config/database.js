// require('dotenv').config()
import 'dotenv/config';
import mysql from 'mysql2/promise'

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    // port: process.env.DB_PORT,
    user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    waitForConnections:true,
    queueLimit: 0
  });

// module.exports = connection; 
export default connection;