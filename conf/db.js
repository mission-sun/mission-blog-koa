const env = process.env.NODE_ENV // 环境变量 环境参数

let dbSetting
if(env == 'development') {
  dbSetting = {
    url: "mongodb://49.234.222.116:27017/demo01",
    tableName: 'testblogData'
  }
}
if(env == 'production') {
  dbSetting = {
    url: "mongodb://49.234.222.116:27017/demo01",
    tableName: 'blogData'  // 实际上查询的是blogDatas 数据（增加了一个s）
  }
} 


module.exports = dbSetting;
