const {promisify} = require('util')
const {batamu, sumNumber} = require('./batako')

function getUsers(arr, cb){
    setTimeout(()=>{
        cb(arr)
    },3000)
}

function userCall(name){
  console.log(name)
}

const getUsersPromise = promisify(getUsers);

getUsersPromise(['joe','john','jane'])
.then(userCall)
.catch(err=>console.log(err))

const promiseMe = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('Success')
    },2000)
})

testAsync = () =>{
    setTimeout(()=>{
        console.log('test')
    },2000)
}
testAsync();
testAsync();

const number = [1,2,3,4,5,6,7,8,9,10]
const even = number.filter( n => {
    return n%2 === 0;
})
console.log(even)
const m = number.map( n => {
    return {number : n*2};
})
console.log(m)

console.log(sumNumber(1,2));
