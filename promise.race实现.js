// allSettled  既要成功也要失败  finally  比较像

// const { resolve } = require("path/posix")
// const { promisify } = require("util")


const p1=new Promise((resolve,reject)=>{
setTimeout(()=>{
    reject('no ok')
},1000)
})

const p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('ok')
    },2000)
    })
//无论成功失败成功 最终都收集起来
    // Promise.allSettled([p2,p1]).then((data)=>{
    //     console.log(data);
    // }).catch(err=>{
    //     console.log(err+'---');
    // })


Promise.race=function(promises){
  return new Promise((resolve,reject)=>{
      for(let i=0;i<promises.length;i++){
        let currentVal=promises[i];
        if(currentVal && typeof currentVal.then==='function'){
            currentVal.then(resolve, reject)
        }else{
            resolve(currentVal);
        }
      }
  })
}

Promise.race([p1,p2,1]).then((data)=>{
console.log(data);
}).catch(error=>{
    console.log(error);
})