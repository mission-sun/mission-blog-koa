const { ErrorModel }  = require("../model/resModel");
let exec = require('../db/mongose');


const checkUser = async (ctx, next) => {
  await exec.findUser(ctx.request.body).then(res => {
    console.log('find-data', res);
    if(res.length) {
      next();
    }
    return false;
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
  // if(ctx.session.userName == null) {
  //   ctx.body = new ErrorModel('没有权限');
  //   return;
  // }
  // next();
}
module.exports = checkUser