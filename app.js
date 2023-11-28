const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs");
const conn = require("./db.js"); 
const app = express();
charDatas = JSON.parse(fs.readFileSync("./character.json", "utf8"));
bookDatas = [];


const port = 3000;
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
});

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static("views"));

conn.query('SELECT * FROM buku', (err, rows) => {  
  if(err) throw err;

  console.log('Data received from Db:');
  bookDatas = rows.map((row) => {
    return {...row};
  });
});

const writeBooks = () => {

  conn.query('SELECT * FROM buku', (err, rows) => {     
    if(err) throw err;
    console.log('Data received from Db:');
    bookDatas = rows.map((row) => {
      return {...row};
    });
    fs.writeFileSync("./books.json", JSON.stringify(bookDatas, null, 2));
  });
};

app.use((req, res, next) => {
  console.log(bookDatas)
  writeBooks();
  next();
});


const dataArr = [
  {
    name: "John",
    age: 25,
  },
  {
    name: "Jane",
    age: 24,
  },
  {
    name: "Jack",
    age: 26,
  },
];

app.get("/user/:id", (req, res) => {
  userId= req.params.id;
  const user = charDatas.find((user) => user.id == userId);

  if(user){
    res.send(user);
  }
  else{
    res.status(404);
    res.send("User not found");
  }
});

app.get("/", (req, res) => {
  // res.sendFile('./public/index.html', { root: __dirname });
  res.render("index", { title: "Home", layout: "layouts/main", dataArr });
});

app.get("/data/:id", (req, res) => {
  const id = req.params.id;
  res.render("data", {
    title: "Data",
    id: id,
    layout: "layouts/main",
    data: charDatas,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
