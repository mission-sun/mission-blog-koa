const router = require('koa-router')()
const checkUser = require('../middlerware/checkUser')

router.prefix('/api/user')

// const isl
// const isHaveData = await checkUserInfo();

router.post('/login', checkUser, async function(ctx, next) {
    const userInfo = ctx.request.body
    console.log('userInfo------success', userInfo)
    const { user, password } = userInfo
    ctx.session.user = user
    ctx.session.password = password
    ctx.body = {
        errNo: 0,
        session: ctx.session,
    }
})

module.exports = router