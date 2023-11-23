//Core Module
const fs = require('fs');

fs.writeFileSync('test.txt','Hello World');
fs.writeFile('TestAsync.txt', 'Hello World',(e)=>{
    console.log(e);
})
const readSync = fs.readFileSync('test.txt','utf-8');
console.log(readSync);
const readAsync = fs.readFile('TestAsync.txt','utf-8',(e,data)=>{
    if(e) throw error;
    console.log(data);
})

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//Save and write new data to json file
rl.question('Masukkan nama anda : ',(name)=>{
    rl.question('Masukkan umur anda : ',(age)=>{
        data = {
            name,
            age};
        file = fs.readFileSync('data.json','utf-8');
        datas = JSON.parse(file);
        datas.push(data);

        fs.writeFileSync('data.json',JSON.stringify(datas));
        rl.close();
    });
});