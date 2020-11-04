const router = require("koa-router")();
const checkLogin = require('../middlerware/checkLogin')

router.prefix("/api/message");
let exec = require('../db/mongose');

const {SuccessModel, ErrorModel }  = require("../model/resModel");


router.post("/create", async function (ctx, next) {
  await exec.messageSave(ctx.request.body).then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    console.log('err', err);
    ctx.body = new ErrorModel(err);
  }) 
})

router.get("/getmessage", async function (ctx, next) {
  await exec.getmessage().then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    console.log('err', err);
    ctx.body = new ErrorModel(err);
  }) 
})



module.exports = router;
