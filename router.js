const express = require("express");
const router = express.Router();
const { pool } = require("./db.js");
const app = express();

router.use(express.json());

router.get("/testcode1", (req, res) => {
    res.send("Hello World");
});

router.post("/kirim", (req, res) => {
    const { body } = req;
    console.log(req.body)
    const q = `INSERT INTO testTable2 (judul, penulis, tahun) VALUES ('${body.judul}', '${body.penulis}', '${body.tahun}')`;

    pool.getConnection((err, conn) => {
        if (err) {
            console.error("Error getting connection:", err);
            return res.status(500).send("Internal Server Error");
        }

        // Use the connection for the query
        conn.query(q, (err, result) => {
            // Release the connection back to the pool
            conn.release();

            if (err) {
                console.error("Error executing query:", err);
                return res.status(500).send("Internal Server Error");
            }
            res.send(result);
        });
    });
});

module.exports = router;
