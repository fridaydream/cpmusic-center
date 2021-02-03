require('@babel/register')();
require('babel-polyfill');
const Koa = require('koa')
const mongoose = require('mongoose')

const { resolve } = require('path')

const R = require('ramda')
const MIDDLEWARES = [ 'common',  'router', 'render' ,]
// const MIDDLEWARES = [ 'common', 'render' ]
const { connect, initSchemas, initAdmin, initCategory } = require('../database/init.js')

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

async function init () {
  await connect()
  // initSchemas()
  // require('./tasks/trailer')
  // require('./tasks/oss')
  await initAdmin()
  initCategory()
  // require('./tasks/movie')
  // require('./tasks/api')
  // userMiddlewares(app)
}

init();
initSchemas()
userMiddlewares(app)

app.listen(7001)

module.exports = app.callback()
