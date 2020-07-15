const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const Moment = require("moment");
const serverRoute = require("./routes/server");
const conf = require("./config");
const path = require("path");

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const { REDIS_CONF } = require('./conf/db');

const index = require("./routes/index");
const users = require("./routes/users");

const blog = require("./routes/blog");



global.USER_DATA = {};

// error handler
onerror(app);

app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(
  logger(() => {
    console.log(Moment().format("YYYY-MM-DD HH:mm:ss"));
  })
);
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// redis  

// app.keys = ['keys', 'keykeys'];
// app.use(session({
//    // 配置cookie
//   cookie: {
//     path: '/',
//     httpOnly: true,
//     maxAge: 24 * 60 * 60 * 1000
//   },
//   // 配置redis
//   store: redisStore({
//     all: `${ REDIS_CONF.host }:${ REDIS_CONF.port }`
//   })
// }));



// routes
// app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());
app.use(blog.routes(), blog.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
  ctx.body = "not find1212";
});

module.exports = app;
