// promistify


// const fs = require('fs').promises;
const fs=require('fs');  //node中内置了promisify

const util=require('util');

//这是一个包需要下载
// const bluebird=require('bluebird');


// fs.readFile('./age',)
function promisify(fn){//高阶函数  方法不内置可自己实现
    return function(...args){  
        return new Promise((resolve,reject)=>{
          fn(...args,(err,data)=>{
              if(err) return reject(err);
              resolve(data);
          });
        })
    }
}
// const readFile=promisify(fs.readFile);
// //怎么把node的api写成promiseapi
// readFile('name.txt','utf8').then(data=>{
// console.log(data);
// })

function promisifyAll(target){
    //Object.keys  Object.defineProperty Rflect.ownKeys
    Reflect.ownKeys(target).forEach(key=>{
        if( typeof target[key] === 'function'){
            target[key+'Async']=util.promisify(target[key])
        }
    });
    return target;
}
//以下是promisifyAll的演示
let obj = promisifyAll(fs);

obj.readFileAsync('name.txt','utf8').then(data=>{
    console.log(data);
})