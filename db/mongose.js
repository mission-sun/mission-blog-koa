//1.引入模块
const mongoose = require("mongoose");
//2.引入参数
//  const dbSetting= {
//    url: "mongodb://49.234.222.116:27017/demo01",
//    dbName: 'root-mission'
//  }
const dbSetting = require("../conf/db");

const env = process.env.NODE_ENV;
console.log("env....", env, process.env.NODE_ENV);

//2.连接数据库
mongoose.connect(dbSetting.url, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log("连接数据库失败");
    return;
  }
  console.log("连接数据库成功");
});
//3.创建一个schema，规定集合内数据的结构和类型，创建规则，规则中不设置，不能插入成功；
let blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  time: String,
});
console.log('tableName', dbSetting.tableName);
let blogData = mongoose.model(dbSetting.tableName, blogSchema);

// 目前手动写博客
//  var oneblog = new blogData(
//    {title: '环境测试',
//    content: '环境测试',
//     time: (new Date()).toLocaleDateString() + " " + (new Date()).toLocaleTimeString()
//   });
//  oneblog.save(function(err){
//    if(err) {
//      console.log('err', err)
//    }else {
//      console.log('saved');
//    }
//  });
// blogData.find({}, (err, docs) => {
//   console.log('docs', docs)
// })

//  mgo.findOne(function (err,docs) {
//   console.log('docs....', docs);
// });

//  数据库的增删改查，直接使用mongose
module.exports = {
  // 增加
  save: (params) => {
    const promise = new Promise((reslove, reject) => {
      oneblog = new blogData({
        title: params.title,
        content: params.content,
        time:new Date().toLocaleDateString() +" " +
          new Date().toLocaleTimeString(),
      });

      oneblog.save((err) => {
        if (err) {
          reject(err);
          return;
        }
        console.log('saved');
        reslove();
      });
    });
    return promise;
  },
  //4.查
  find: function () {
    const promise = new Promise((reslove, reject) => {
      blogData.find({}, (err, docs) => {
        if (err) {
          reject(err);
          return;
        }
        reslove(docs);
      });
    });
    return promise;
  },

  deleteOne: function (params) {
    const promise = new Promise((reslove, reject) => {
      blogData.remove(params, (err, docs) => {
        if (err) {
          console.log('err-delete', err)
          reject(err);
          return;
        }
        reslove(docs);
      });
    });
    return promise;
  },


  //1）插入多条数据：单个数据可以是json对象，多个数据放在数组中；
  insertMany: function (aryjson, callback) {
    mgo.insertMany(aryjson, function (err, docs) {
      callback(err, docs);
    });
  },
  //2.删
  //1）删除满足条件的一条数据：

  //2）删除满足条件的所有数据：
  deleteMany: function (filter, callback) {
    mgo.deleteMany(filter, function (err, doc) {
      callback(err, doc);
    });
  },
  //3.改
  //1）修改满足条件的一条数据：
  updateOne: function (filter, updatejson, callback) {
    mgo.updateOne(filter, updatejson, function (err, doc) {
      callback(err, doc);
    });
  },
  //2）修改满足条件的多条数据：
  updateMany: function (filter, updatejson, callback) {
    mgo.updateMany(filter, updatejson, function (err, doc) {
      callback(err, doc);
    });
  },
  //2）获取满足条件的数据总个数
  count: function (filter, callback) {
    mgo.countDocuments(filter, function (err, count) {
      callback(err, count);
    });
  },
};
