const express = require("express");
const router = express.Router();
const fs = require("fs");


router.get("/testcode1", (req, res) => {
   res.send("Hello World");
    });


module.exports = router;