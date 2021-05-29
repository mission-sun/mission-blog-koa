const router = require("koa-router")();
const checkLogin = require('../middlerware/checkLogin')

router.prefix("/api/blog");
// let exec = require ('../db/mongo');
let exec = require('../db/mongose');

const {SuccessModel, ErrorModel,}  = require("../model/resModel");
// checkLogin ,
// router.get("/list",  checkLogin,  async function (ctx, next) {

router.get("/list", async function (ctx, next) {
  // 注意只有静态资源可以请求做缓存了，接口没有缓存这一说
  // ctx.request.header = cache-control
  // ctx.set('Cache-Control', 'max-age=3');
  // ctx.set('Expires', `'${new Date()}'`);
  // if (ctx.get('if-modified-since')) {
  //   // stat.ctime.toGMTString 可以读取文件的修改时间
  //   console.log('if-modified-since', ctx.get('if-modified-since'), ctx.get('Last-Modified'))
  // }
  // let newTime = new Date().getTime();
  // ctx.set({
  //   'Cache-Control': 'no-cache',
  //   'Last-Modified': newTime
  // })  
  // let cache = {
  //   maxAge: 600000,
  //   expires: false,
  //   cacheContrl: true,
  //   lastModified: false,
  //   eTag: false,
  // }
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
  await exec.save(ctx.request.body).then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
})

router.get("/detail", async function (ctx, next) {
  let currentCookie = ctx.cookies.get('root-mission');
  if (currentCookie === 'lovesmx') {
    console.log('userid', currentCookie);
  }
  await exec.findOne(ctx.query).then(res => {
    ctx.body = new SuccessModel(res);
  }).catch(err => {
    ctx.body = new ErrorModel(err);
  }) 
})


// updateOne


router.post("/updateOne", async function (ctx, next) {
  console.log('update', ctx.request.body);
  let filter = {
    _id: ctx.request.body.id
  };
  let data = {
    ...ctx.request.body,
    
  }
  await exec.updateOne(filter, data).then(res => {
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
