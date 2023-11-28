const mysql = require("mysql");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "librarow",
});
conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});

const createTable = () => {
  const sql = ` CREATE TABLE IF NOT EXISTS testTable (
        id int NOT NULL AUTO_INCREMENT,
        judul varchar(255), 
        penulis varchar(255), 
        tahun int, 
        PRIMARY KEY (id))`;
  conn.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
};

module.exports = {
    conn,
    createTable,
};
