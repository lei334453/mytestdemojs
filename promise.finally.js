// Promise.prototype.finally  不是try catch finally 具体实现如下
Promise.prototype.finally=function(callback){
    return this.then(()=>{
        //让函数执行 内部会调用方法 如果方法是promise等待完成
     return  Promise.resolve(callback()).then(()=>data)
    },err=>{//异常失败
        return Promise.resolve(callback()).then(()=>{
            throw err;
        })
    })
}
Promise.resolve(123).finally(data=>{
    console.log('finally');
    //可以返回一个promise
    return new Promise((resolve,reject)=>{
       setTimeout(()=>{
        // resolve('ok');
        reject('reject');
       },5000)
    })
}).then(data=>{
    console.log('s'+data);
},error=>{
    console.log('error'+error);
})