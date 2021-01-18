const Koa = require('koa')
const { resolve } = require('path')
const { connect, initSchemas, initAdmin } = require('../database/init.js')

const R = require('ramda')
const isDev = process.env.NODE_ENV === 'development'
console.log(isDev)
const MIDDLEWARES = [ 'common', 'router', 'render' ]

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

;(async () => {
  await connect()
  await initSchemas()
  // require('./tasks/trailer')
  // require('./tasks/oss')
  await initAdmin()
  // require('./tasks/movie')
  // require('./tasks/api')
  const app = new Koa()
  await userMiddlewares(app)
  app.listen(7001)
  console.log('listen 7001')
})();
