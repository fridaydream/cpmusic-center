require('@babel/register')();
require('babel-polyfill');
require('./server/index');

const Koa = require('koa')
const { resolve } = require('path')

const R = require('ramda')
const MIDDLEWARES = [ 'common', 'router', 'render' ]

const userMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./server/middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

const app = new Koa()

userMiddlewares(app)
setTimeout(() => {
  module.exports = app.callback()
}, 10000)
