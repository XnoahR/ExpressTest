import express from "express";
// import {sequelize} from "./utils/db.js";
import user from "./models/userModel.js";
const app = express();
const port = 3000;

// app.use(('/', (req, res) => createTable()
//     .then(() => res.send("Table created."))
//     .catch((err) => res.send(err.message)
//     )));

app.get("/", (req, res) => {
  try {
    user.findAll().then((result) => {
      res.send(result);
    });
  } catch (err) {
    res.status(500);
    console.log(err.message);
  }
});

app.get("/insert",(req,res)=>{
    user.create({
        username:"johndoe1",
        email:"johndo1@gmail.com",
        password:"123456",
        role:1,
        name:"John Doe",
        phone:"08123456789"
    }).then((result)=>{
        res.send(result);
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
