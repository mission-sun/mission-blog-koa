//1.引入模块
const mongoose = require("mongoose");
//2.引入参数
//  const dbSetting= {
//    url: "mongodb://49.234.222.116:27017/demo01",
//    dbName: 'root-mission'
//  }
const dbSetting = require("../conf/db");

const env = process.env.NODE_ENV;
console.log("env....", env);

//2.连接数据库
mongoose.connect(dbSetting.url, { useNewUrlParser: true }, function(err) {
    if (err) {
        console.log("连接数据库失败");
        return;
    }
    console.log("连接数据库成功", dbSetting.url + dbSetting.dbName);
  // let oneBlog = new blogModel({ 
  //     title: 'title',
  //     content: 'String',
  //     time: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
  // });
  // console.log('oneBlog', oneBlog);
  // oneBlog.save(function(err) {
  //   if (err) {
  //       console.log("err", err);
  //   } else {
  //       console.log("saved");
  //   }
  // });

});

let blogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  time: String,
  image: String
});



// 表格名称，会自动的在数据库中创建 blogmodels 的表格
let blogModel = mongoose.model('blogModel', blogSchema);

let messageSchema = new mongoose.Schema({
    name: String,
    message: String,
    time: String
});
let messageModel = mongoose.model('messageModel', messageSchema);


// 创建用户表格
let userSchema = new mongoose.Schema({
    user: String,
    password: String,
});
console.log("tableName", dbSetting.tableName);
// let blogData = mongoose.model(dbSetting.tableName, blogSchema);

let userInfo = mongoose.model(dbSetting.userTable, userSchema);

//  数据库的增删改查，直接使用mongose
module.exports = {
    messageSave: (params) => {
        const promise = new Promise((reslove, reject) => {
            oneMessage = new messageModel({
                name: params.name,
                message: params.message,
                time: params.time
            });
            oneMessage.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("saved");
                reslove();
            });
        });
        return promise;
    },
    getmessage: () => {
        const promise = new Promise((reslove, reject) => {
            messageModel.find({}).sort({time: -1}).exec((err, docs) => {
                if (err) {
                    console.log('err', err);
                    reject(err);
                    return;
                }
                let nowTime = new Date().getTime();
               
                const getTime = (time) => {
                    let oneMin = 60*1000;
                    let oneHour = 60*60*1000;
                    let oneDay = 24*60*60*1000;
                    let oneMon = 30*24*60*60*1000;
                    if (time < oneMin) {
                        return '刚刚';
                    };
                    if (time > oneMin && time < oneHour) {
                        return `${Math.ceil(time/oneMin)}分钟前`;
                    };
                    if (time > oneHour && time < oneDay) {
                        return `${Math.ceil(time/oneHour)}小时前`;
                    };
                    if (time > oneDay && time < oneMon) {
                        return `${Math.ceil(time/oneDay)}天前`;
                    };
                    if (time > oneMon) {
                        return `${Math.ceil(time/oneMon)}月前`;
                    };
                }
                docs = docs.map( item => {
                    item.time = getTime(nowTime -item.time);
                    return item;
                })
                console.log('docs', docs);
                reslove(docs);
            })
        })
        return promise;
     },
    // 增加
    save: (params) => {
        const promise = new Promise((reslove, reject) => {
            oneblog = new blogModel({
                title: params.title,
                description: params.description,
                content: params.content,
                image: params.image,
                time: new Date().toLocaleDateString() +
                    " " +
                    new Date().toLocaleTimeString(),
            });
            oneblog.save((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                console.log("saved");
                reslove();
            });
        });
        return promise;
    },
    find: (params) => {
        const promise = new Promise((reslove, reject) => {
            blogModel.find({}).sort({time: -1}).exec((err, docs) => {
                if (err) {
                    console.log('err', err);
                    reject(err);
                    return;
                }
                reslove(docs);
            })
        })
         return promise;
     },
    findOne: (params) => {
        const promise = new Promise((reslove, reject) => {
        blogModel.findOne( params , (err, docs) => {
                 if (err) {
                     console.log('err', err);
                     reject(err);
                     return;
                 }
                //  console.log('docs', docs);
                 reslove(docs);
             });
         });
         return promise;
     },
     updateOne: (filter, data) => {
        data.time = new Date().toLocaleDateString() + " "+ new Date().toLocaleTimeString();
        const promise = new Promise((reslove, reject) => {
        blogModel.updateOne( filter, data,  (err, docs) => {
                 if (err) {
                     console.log('err', err);
                     reject(err);
                     return;
                 }
                //  console.log('docs', docs);
                 reslove(docs);
             });
         });
         return promise;
     },
     // 更新数据
    // updateOne: function(filter, updatejson, callback) {
    //     mgo.updateOne(filter, updatejson, function(err, doc) {
    //         callback(err, doc);
    //     });
    // },
    //4.查
    findUser: function(data) {
        const promise = new Promise((reslove, reject) => {
            let params = data || {};
            console.log('params-data', params);
            userInfo.find(params, (err, docs) => {
                if (err) {
                    reject(err);
                    return;
                }
                reslove(docs);
            });
        });
        return promise;
    },

    deleteOne: function(params) {
        const promise = new Promise((reslove, reject) => {
            blogModel.remove(params, (err, docs) => {
                if (err) {
                    console.log("err-delete", err);
                    reject(err);
                    return;
                }
                reslove(docs);
            });
        });
        return promise;
    },

    //1）插入多条数据：单个数据可以是json对象，多个数据放在数组中；
    insertMany: function(aryjson, callback) {
        mgo.insertMany(aryjson, function(err, docs) {
            callback(err, docs);
        });
    },
    //2.删
    //1）删除满足条件的一条数据：

    //2）删除满足条件的所有数据：
    deleteMany: function(filter, callback) {
        mgo.deleteMany(filter, function(err, doc) {
            callback(err, doc);
        });
    },
    //2）修改满足条件的多条数据：
    updateMany: function(filter, updatejson, callback) {
        mgo.updateMany(filter, updatejson, function(err, doc) {
            callback(err, doc);
        });
    },
    //2）获取满足条件的数据总个数
    count: function(filter, callback) {
        mgo.countDocuments(filter, function(err, count) {
            callback(err, count);
        });
    },
};