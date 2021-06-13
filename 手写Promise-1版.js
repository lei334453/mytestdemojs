//粗制版本 同步版本
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
     const resolve=(val)=>{
         if(this.status===STATUS.PENDING){
            this.status=STATUS.FUFILLED;
            this.value=val;
         }
     }
     const reject=(reason)=>{
         if(this.status===STATUS.PENDING){
            this.status=STATUS.REJECTED;
            this.reason=reason;
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
    }
}

module.exports = Promise;