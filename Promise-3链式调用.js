//粗制版本 同步版本  发布订阅模式
const STATUS={
    PENDING:"PENDING",
    FUFILLED:"FUEILLED",
    REJECTED:'REJECTED'
}
//then的链式调用
//promise的链式调用 会成为下一次的promise的值then的值
// 如果不是promise结果会抛给后一层的then
//失败会走到下一层的error
//如果返回的是promise的  会用这个promise的成功或者失败结果是下一回
//then的结果

//出错失败  返回的promise出错  下一个then方法 

//cache是then的别名 没有成功只有失败 优先处理 
//then 方法为什么可以链式调用  每次调用then都会返回新的promise 

class Promise{
    constructor(executor){
    this.status=STATUS.PENDING;
    this.value=undefined;
    this.reason=undefined;
    //订阅 两个队列
    this.onResolvedCallbacks=[];
    this.onRejectedCallbacks=[];
     const resolve=(val)=>{
         if(this.status===STATUS.PENDING){
            this.status=STATUS.FUFILLED;
            this.value=val;
            //发布
            this.onResolvedCallbacks.forEach(fn=>fn())
         }
     }
     const reject=(reason)=>{
         if(this.status===STATUS.PENDING){
            this.status=STATUS.REJECTED;
            this.reason=reason;
            this.onRejectedCallbacks.forEach(fn=>fn())
         }
     }
     try{
     executor(resolve,reject);
     }cache(e){
    //出错走失败逻辑
      reject(e)
      }
    }
    then(onFullfied,onRejected){
        let promise2=new Promise((resolve,reject)=>{
        //    promise2(x)
           //把这些放进来为了拿到x  可能会出错
           if(this.status===STATUS.FUFILLED){
               try {
                let x=onFullfied(this.value);
                resolve(x)
               } catch (e) {
                   reject(x)
               }
        }
        if(this.status===STATUS.REJECTED){
            try {
                let x=onRejected(this.value);
                resolve(x)
               } catch (e) {
                   reject(x)
               }
        }
        if(this.status===STATUS.PENDING){
        //先存好  装饰模式 切片编程
        this.onResolvedCallbacks.push(()=>{//todo...
            // let x= onFullfied(this.value);
            // resolve(x)
            try {
                let x= onFullfied(this.value);
               resolve(x)
            } catch (e) {
                reject(x)
            }
        });
        this.onRejectedCallbacks.push(()=>{
            // let x=onRejected(this.reason);
            // resolve(x)
            try {
               let x=onRejected(this.reason);
            resolve(x)
            } catch (e) {
            reject(x)
            }
        });
        }
        })
        
        return promise2;
    }
}

module.exports = Promise;