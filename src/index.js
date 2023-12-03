import express from "express";
import {sequelize, createTable} from "./utils/db.js";
const app = express();
const port = 3000;


app.use(('/', (req, res) => createTable()
    .then(() => res.send("Table created."))
    .catch((err) => res.send(err.message)
    )));


app.get("/test", (req, res) => {    
    sequelize.authenticate().then(() => {
        res.send("Connected to the database.");
    }).catch((err) => {
        res.send("Unable to connect to the database:" + err.message);
    });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});