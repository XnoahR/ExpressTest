const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("views"));

const dataArr = [
//   {
//     name: "John",
//     age: 25,
//   },
//   {
//     name: "Jane",
//     age: 24,
//   },
//   {
//     name: "Jack",
//     age: 26,
//   },
];

app.get("/", (req, res) => {
  // res.sendFile('./public/index.html', { root: __dirname });
  res.render("index", { title: "Home",
  layout: "layouts/main",
  dataArr });
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  res.render("data", { title: "Data", id: id,
  layout: "layouts/main",
  dataArr });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
