const mysql = require("mysql");

// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "librarow",
//     connectionLimit: 10,
// });

const conn = mysql.createConnection({
    host: "34.128.115.229",
    user: "root",
    password: "123",
    database: "perpustakaan",
});


// const getConnection = (cb) => {
//     pool.getConnection((err, conn) => {
//         if (err) throw err;
//         cb(conn);
//     });
// };


const createTable = (conn) => {
    const q = `CREATE TABLE IF NOT EXISTS bookTest (
        id int NOT NULL AUTO_INCREMENT,
        judul varchar(255), 
        penulis varchar(255), 
        tahun int, 
        PRIMARY KEY (id))`;
    conn.query(q, (err, result) => {
        if (err) throw err;
        console.log("Table created");
    });
};  


// };  
// pool.getConnection((err, conn) => {
//     if (err) throw err;
//     console.log("Mysql Connected...");
//     conn.release();
// });


// const createTable = () => {
//     const sql = ` CREATE TABLE IF NOT EXISTS testTable (
//         id int NOT NULL AUTO_INCREMENT,
//         judul varchar(255), 
//         penulis varchar(255), 
//         tahun int, 
//         PRIMARY KEY (id))`;
//         conn.query(sql, (err, result) => {
//             if (err) throw err;
//             console.log("Table created");
//         });
//     };
    
    module.exports = {
        createTable,
        conn
    };
    
    // const conn = mysql.createConnection({
    //   host: "34.101.133.200",
    //   user: "root",
    //   password: "123",
    //   database: "testDB",
    // });
    // conn.connect((err) => {
    //   if (err) throw err;
    //   console.log("Mysql Connected...");
    // });