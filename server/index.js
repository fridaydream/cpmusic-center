require('@babel/register')();
require('babel-polyfill');
const Koa = require('koa')
const { resolve } = require('path')

const R = require('ramda')
const MIDDLEWARES = [ 'common', 'router', 'render' ]
const { connect, initSchemas, initAdmin } = require('../database/init.js')

const userMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

const app = new Koa()


;(async () => {
  await connect()
  await initSchemas()
  // require('./tasks/trailer')
  // require('./tasks/oss')
  // await initAdmin()
  // require('./tasks/movie')
  // require('./tasks/api')
  userMiddlewares(app)
})();

app.listen(7001)

module.exports = app;
