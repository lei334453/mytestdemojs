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

//返回值與promise2的關係 
function resolvePromise(x,promise2,resolve,reject){
 //注意循環引用
if(promise2===x){
    return (new TypeError('出錯了'))
}
//看x是否是普通值還是promise 
if((typeof x==='object'&& x!===null) || typeof x==='function'){
//x是對象或者是函數
let called;//给别人的promise做兼容
        try {
            let then = x.then;
        if(typeof then==='function'){
        //這時then是函數 x是一個promise

        //如果x是promise  采用他的狀態
        then.call(x,
          function(y){
              if(called) return;
              called=true;
            //   resolve(y) 递归解释promise
            resolvePromise(y,promise2,resolve,reject)
            },function(r){
                called=true;
              reject(r);
            })
            }else{
                resolve(x)//此時是對象
            }
            } catch (e) {
                if(called) return;
                called=true;
                reject(e)//取then時抛出錯誤
            }
            }else{
            //原始值 不是promise
            resolve(x)
            }
            //不是promise直接調用
            }
        // 按規範的promiseA+

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
               setTimeout(()=>{
                try {
                    let x=onFullfied(this.value);
                    resolvePromise(x,promise2,resolve,reject)
                    // resolve(x)
                   } catch (e) {
                       reject(x)
                   }
               },0);  
        }
        if(this.status===STATUS.REJECTED){
            setTimeout(()=>{
                try {
                    let x=onRejected(this.value);
                    resolvePromise(x,promise2,resolve,reject)
                   } catch (e) {
                       reject(x)
                   }
            },0)
        }
        if(this.status===STATUS.PENDING){
        //先存好  装饰模式 切片编程
        this.onResolvedCallbacks.push(()=>{//todo...
            setTimeout(()=>{
                try {
                    let x= onFullfied(this.value);
                    resolvePromise(x,promise2,resolve,reject)
                } catch (e) {
                    reject(x)
                }
            },0)
          
        });
        this.onRejectedCallbacks.push(()=>{
           setTimeout(()=>{
            try {
                let x=onRejected(this.reason);
                //這句話是判斷 promise2與promise2的關係
                resolvePromise(x,promise2,resolve,reject)
             } catch (e) {
             reject(x)
             }
           },0)
           });
          }
        })
        return promise2;
    }
}

module.exports = Promise;