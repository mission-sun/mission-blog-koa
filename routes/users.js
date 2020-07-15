const router = require('koa-router')()

router.prefix('/api/user')

router.post('/login', function (ctx, next) {
  const userInfo = ctx.request.body;
  ctx.body = {
    errNo: 1,
    userInfo
  }
})

module.exports = router
