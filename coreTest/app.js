//Core Module
const fs = require('fs');
const { resolve } = require('path');

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
//Save and write new data to json file (Callback)
// rl.question('Masukkan nama anda : ',(name)=>{
//     rl.question('Masukkan umur anda : ',(age)=>{
//         data = {
//             name,
//             age};
//         file = fs.readFileSync('data.json','utf-8');
//         datas = JSON.parse(file);
//         datas.push(data);

//         fs.writeFileSync('data.json',JSON.stringify(datas));
//         rl.close();
//     });
// });

//Save and write new data to json file (Promise)

const name = () => {
    return new Promise((resolve,reject) => {
        rl.question('Input your name: ',(name) => {
            if(name.length < 3){
                reject('Name is too short');
            }

            resolve(name);
        })
    })
}

const age = () => {
    return new Promise((resolve,reject) => {
        rl.question('Input your age: ',(age) => {
            if(age < 18){
                reject('Age is too young');
            }

            resolve(age);
        })
    })
}

const question = async () => {
    try{
        const nameInput = await name();
        const ageInput = await age();

        const data = {
            name: nameInput,
            age: ageInput
        }
        const file = fs.readFileSync('data.json','utf-8');
        const datas = JSON.parse(file);
        datas.push(data);

        fs.writeFileSync('data.json',JSON.stringify(datas));
        rl.close();
    }catch(e){
        console.log(e);
        rl.close();
    }
}

question();