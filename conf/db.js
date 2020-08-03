const env = process.env.NODE_ENV // 环境变量 环境参数
let dbUser = "bloguser";
let dbPwd = "mission-blog"
let dbSetting
if (env == 'development') {
    dbSetting = {
        // url: "mongodb://49.234.222.116:27017/",
        url: `mongodb://${dbUser}:${dbPwd}@49.234.222.116:27017/`,
        tableName: 'testblogData',
        dbName: 'blogDb',
        userTable: 'usertable',
        host: '127.0.0.1',
        port: 6379
    }
}
if (env == 'production') {
    dbSetting = {
        // url: "mongodb://49.234.222.116:27017/",
        url: `mongodb://${dbUser}:${dbPwd}@49.234.222.116:27017/`,
        dbName: 'blogDb',
        tableName: 'blogData', // 实际上查询的是blogDatas 数据（增加了一个s）
        userTable: 'usertable'
    }
}


module.exports = dbSetting;