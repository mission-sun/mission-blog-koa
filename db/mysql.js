const mysql = require('mysql');
const { MYSQL_CONF} = require('../conf/db')

// 创建连接对象
const connection = mysql.createConnection( MYSQL_CONF)
console.log('执行连接');

// 创建连接
connection.connect();
const exec = (sql) => {
  const promise = new Promise((reslove, reject) => {
    connection.query(sql, (error, results) => {
      if(error) {
        reject(error)
        return
      }
      reslove(results)
    })
  })
  return promise
}

module.exports = exec