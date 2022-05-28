const { database } = require('./keys');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
        user: 'root',
        password: '',
        database: 'appandroid',
        host: 'localhost'
});

pool.getConnection((err,connection) =>{
    if(err)   throw err;
    console.log('Database connected successfully');
    connection.release();
})

module.exports = pool;
