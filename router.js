const express = require("express");
const router = express.Router();
const app = express();
const {conn} = require("./db.js");


router.use(express.json());


router.get("/", (req, res) => {
    res.send("Hello World");
});



router.post("/book", (req, res) => {
    const {judul, penulis, tahun} = req.body;
    const q = `INSERT INTO bookTest (judul, penulis, tahun) VALUES ("${judul}", "${penulis}", "${tahun}")`;

    conn.query(q, (err, result) => {
        if (err) throw err;
        res.status(201)
        .send("Data inserted");
    });
});

router.get("/ambilBuku", (req, res) => {
    const q = `SELECT * FROM bookTest`;

    conn.query(q, (err, result) => {
        if (err) throw err;
        res.status(200)
        .send(result);
    });
});



module.exports = router;
