const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'librarow'
});
conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});


module.exports = conn;