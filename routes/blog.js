const router = require("koa-router")();

router.prefix("/api/blog");
// let exec = require ('../db/mongo');
let exec = require('../db/mongose');


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
    console.log('res.....', res);
    ctx.body = res;
  })
  // console.log('getData', getData());
 
  // ctx.body = {
  //   errNo: 1,
  //   query,
  //   session: ctx.session,
  //   viewCont: ctx.session.viewCount
  // };
});

module.exports = router;
