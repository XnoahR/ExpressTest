const mysql = require("mysql");

const pool = mysql.createPool({
    host: "34.101.133.200",
    user: "root",
    password: "123",
    database: "testDB",
    connectionLimit: 10,
});


const getConnection = (cb) => {
    pool.getConnection((err, conn) => {
        if (err) throw err;
        cb(conn);
    });
};


const createTable = (conn) => {
    const q = `CREATE TABLE IF NOT EXISTS testTable2 (
        id int NOT NULL AUTO_INCREMENT,
        judul varchar(255), 
        penulis varchar(255), 
        tahun int, 
        PRIMARY KEY (id))`;
    conn.query(q, (err, result) => {
        if (err) throw err;
        console.log("Table created");
        conn.release();
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
        getConnection,
        createTable,
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