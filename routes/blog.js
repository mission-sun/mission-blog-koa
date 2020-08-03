const router = require("koa-router")();
const checkLogin = require('../middlerware/checkLogin')

router.prefix("/api/blog");
// let exec = require ('../db/mongo');
let exec = require('../db/mongose');

const {SuccessModel, ErrorModel,}  = require("../model/resModel");
// checkLogin ,
router.get("/list",  checkLogin,  async function (ctx, next) {
  // const query = ctx.query;
  // if (ctx.session.viewCount == null) {
  //   ctx.session.viewCount = 0;
  // }else {
  //   ctx.session.viewCount ++;
  // }

  // console.log('viewCount', ctx.session)
  // exec
  // ctx.body  = {
  //   session:  ctx.session.viewCount
  // }

 
  await exec.find().then(res => {
    console.log('list')
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
  // console.log('getData', getData());
 
  // ctx.body = {
  //   errNo: 1,
  //   query,
  //   session: ctx.session,
  //   viewCont: ctx.session.viewCount
  // };
});

router.post("/create", async function (ctx, next) {
  console.log('create', ctx.request.body);
  await exec.save(ctx.request.body).then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
})

router.post("/delete", async function (ctx, next) {
  console.log('delete', ctx.request.body);
  await exec.deleteOne(ctx.request.body).then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
})

module.exports = router;
