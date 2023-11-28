const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fs = require("fs");
const {conn, createTable} = require("./db.js"); 
const app = express();
charDatas = JSON.parse(fs.readFileSync("./character.json", "utf8"));
bookDatas = [];


app.set('port', process.env.PORT || 3000);
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  createTable();
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
    bookDatas.push(...rows);
    fs.writeFileSync("./books.json", JSON.stringify(bookDatas, null, 2));
  });
};

app.use((req, res, next) => {
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
    bookDatas,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(app.get('port'), () => {
  console.log(`listening at http://localhost:${app.get('port')}`);
});
