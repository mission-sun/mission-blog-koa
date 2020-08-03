const { ErrorModel }  = require("../model/resModel");

const checkLogin = async (ctx, next) => {
  console.log('ctx.session.user', ctx.session.user);
  if(!ctx.session.user) {
    ctx.body = new ErrorModel('未登录');
    return;
  }
  console.log('检测到登录')
  await next();
}
module.exports = checkLogin