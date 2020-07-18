const router = require("koa-router")();

router.prefix("/api/blog");
// let exec = require ('../db/mongo');
let exec = require('../db/mongose');

const {SuccessModel, ErrorModel,}  = require("../model/resModel");

router.get("/list", async function (ctx, next) {
  // const query = ctx.query;
  // if (ctx.session.viewCount == null) {
  //   ctx.session.viewCount = 0;
  // }else {
  //   ctx.session.viewCount ++;
  // }
  // exec

  // const getData = async () => {
  //   let data = await exec();
  //   console.log('data', data);
  //   ctx.body = {};
  // }
  // await exec().then(res => {
  //   console.log('res.....', res);
  //   ctx.body = res;
  // })

  // await exec.find( function(err, docs){
  //   console.log('docs1212', docs);
  //   ctx.body = {};
  // })

  await exec.find().then(res => {
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
