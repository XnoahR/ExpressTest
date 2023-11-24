const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(
        fs.readFileSync('./index.html', 'utf-8')
    );
});




app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404</h1>');
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});