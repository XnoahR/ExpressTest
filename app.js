const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('views'));


app.get('/', (req, res) => {
    // res.sendFile('./public/index.html', { root: __dirname });
    res.render('index', { title: 'Home' });
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    res.render('data', { title: 'Data', id: id });
});


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});