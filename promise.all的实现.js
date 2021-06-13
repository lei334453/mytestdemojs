
//静态方法

// const Promise = require("./Promise-5");

// // const Promise = require("./Promise-5");

// Promise.resolve('1223').then(data=>{
//     console.log('123');
// })

// let p=new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('ok')
//     },1000);
// })
// Promise.resolve(p).then()

function isPromise(val){
    return val && (typeof val.then==='function')
}


//一个失败全部失败  没法try cache
Promise.all=function(promises){
   return new Promise((resolve,reject)=>{
    // console.log(data);
    let result=[];
    let times=0;
    //结果和索引的对应起来
    function processData(index,val){
        result[index]=val;
        //不能对比长度
        if(++times===promises.length){
            resolve(result)
        }
    }
    for(let i = 0;i<promises.length; i++){
       let p = promises[i];
       if(isPromise(p)){
           p.then((data)=>{
            processData(i,data);//promise转 普通值
           },
           reject)
         }else{
          processData(i,p)//普通值
         }
       }
   })
}


const fs=require('fs').promises

let getName= fs.readFile('./name.txt','utf8');

let getage=fs.readFile('./age.txt','utf8')

Promise.all([1,getName,getage,2]).then(data=>{
    console.log(data);
})

//fetch  是不能中断请求的