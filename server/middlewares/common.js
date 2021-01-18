const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

const compress = require('koa-compress');
const mount = require('koa-mount');
const { join } = require('path');

const root = join(__dirname, 'dist');

const addBodyParser = app => {
  app.use(bodyParser())
}

const addGZIP = app => {
  app.use(
    compress({
      threshold: 2048,
      gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
      },
      br: false, // 禁用br解决https gzip不生效加载缓慢问题
    }),
  );
}

const addStatic = app => {
  app.use(mount('/dist', require('koa-static')(root)))
}

const addSession = app => {
  app.keys = ['umi']
  const CONFIG = {
    key: 'koa:sess',
    maxAge: 864000000,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: false
  }
  app.use(session(CONFIG, app))
}

module.exports = {
  addGZIP,
  addStatic,
  addSession,
  addBodyParser
}
