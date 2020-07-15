const redis = require('redis')

const REDIS_CONF = require("../conf/db")

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

redisClient.on('error', err => {
  console.error(err)
})


// redisClient.set("myname", "zhangsan", redis.print);

// redisClient.get("myname", (err, val) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log("val", val);

//   redisClient.quit();
// });

const setVal = (key, val) => {
  if(typeof val == 'object' ) {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}


const getVal = (key) => {
  const promise = new Promise((reslove, reject) => {
    redis.get(key, (err, val) => {
      if(err) {
        reject(val)
        return 
      }
      // 当随便填写一个key值得时候，可能为null
      if(val ==  null) {
        reslove(null)
        return
      }
      // 利用try catch 的方法实现 对象的转换
      try
      {
        resolve(JSON.parse(val))
      }catch(err) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  setVal,
  getVal
}