//超时处理 

let p1=new Promise((resolve,reject)=>{
    // p1.abort=reject
    setTimeout(()=>{
    resolve('成功了')
    },4000)
})

function wrap(p1){
//用户的p1 我在内部再构建 一个promise
    let abort;
    let p2=new Promise((resolve,reject)=>{
        abort=reject;
    })
    let newP=Promise.race([p1,p2])
    newP.abort=abort;
    return newP;
}



let p2=wrap(p1);
p2.then(data=>{
    console.log(data);
}).catch(err=>{
    console.log(err);
})

setTimeout(()=>{
p2.abort('错误信息');
},2000)