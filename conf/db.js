const env = process.env.NODE_ENV // 环境变量 环境参数

let MYSQL_CONF
let REDIS_CONF
let MONGO_CONF
if(env == 'dev') {
  MYSQL_CONF = {
    host     : 'localhost',
    user     : 'root',
    password : 'intheroot',
    database : 'blog'
  }

  //redis 配置
  REDIS_CONF = {
    port:   6379,
    host: '127.0.0.1'
  }
} 

if(env == 'prd') {
  MYSQL_CONF = {
    host     : 'localhost',
    user     : 'root',
    password : 'intheroot',
    database : 'blog'
  }

  //配置 redis 线上连接
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
} 

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
} 
