//粗制版本 同步版本  发布订阅模式
const STATUS={
    PENDING:"PENDING",
    FUFILLED:"FUEILLED",
    REJECTED:'REJECTED'
}
class Promise{
    constructor(executor){
    this.status=STATUS.PENDING;
    this.value=undefined;
    this.reason=undefined;
    //订阅
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
        if(this.status===STATUS.FUFILLED){
            onFullfied(this.value);
        }
        if(this.status===STATUS.REJECTED){
            onRejected(this.reason);
        }
        if(this.status===STATUS.PENDING){
        //先存好  装饰模式 切片编程
        this.onResolvedCallbacks.push(()=>{//todo...
            onFullfied(this.value)
        });
        this.onRejectedCallbacks.push(()=>{
            onRejected(this.reason)
        });
        }
    }
}

module.exports = Promise;