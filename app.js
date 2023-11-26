const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    res.send(`data ${id}, ${req.query.hewan}`)
});


app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});