const express = require('express');
const app = express();
const fs = require('fs');

const port = 3000;
app.use(express.json());

app.post('/api', (req, res) => {
    const { body } = req;
    const file = fs.readFileSync('./test.json', 'utf-8');
    datas = JSON.parse(file);
    datas.push(body);   
    fs.writeFileSync('./test.json', JSON.stringify(datas));
    return res.send(`body: ${body?.name} ${body?.age}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});