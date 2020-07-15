const mongodb = require("mongodb");
// const { MYSQL_CONF} = require('../conf/db')
const mongoClient = mongodb.MongoClient; // 端可以连接数据库。从而实现对数据的操作

// mongoose 是对mongodb的操作



const exec1212 = (cb) => {
  mongoClient.connect("mongodb://49.234.222.116:27017", { useUnifiedTopology: true },function(err,db){
  if (err) throw err;
   // client.db();
    var dbo = db.db("demo01");
      dbo.collection("blogData"). find({}).toArray(function(err, result) { // 返回集合中所有数据
          if (err) throw err;
          console.log(result);
          cb(result)
          db.close();
      });
  })
}

const exec = (sql) => {
  const promise = new Promise((reslove, reject) => {
    mongoClient.connect("mongodb://49.234.222.116:27017", { useUnifiedTopology: true },function(err,db){
      if (err) throw err;
        var dbo = db.db("demo01");
          dbo.collection("blogData"). find({}).toArray(function(err, result) { // 返回集合中所有数据
              if (err) throw err;
              reslove(result)
              db.close();
          });
      })

    // connection.query(sql, (error, results) => {
    //   if(error) {
    //     reject(error)
    //     return
    //   }
    //   reslove(results)
    // })
  })
  return promise
}

module.exports = exec