const {promisify} = require('util')

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