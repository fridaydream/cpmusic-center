const Router = require('koa-router')
const { resolve } = require('path')
const glob = require('glob')
const symbolPrefix = Symbol('prefix')
const routerMap = new Map()
const _ = require('lodash')
const isArray = c => _.isArray(c) ? c : [c]
const R = require('ramda')
class Route {
  constructor(app, apiPath) {
    this.app = app
    this.apiPath = apiPath
    this.router = new Router()
  }

  init() {
    glob.sync(resolve(this.apiPath, './**/*.js')).forEach(require)
    for (let [conf, controller] of routerMap) {
      const controllers = isArray(controller)
      const prefixPath = conf.target[symbolPrefix]
      if (prefixPath) prefixPath = normalizePath(prefixPath)
      const routerPath = prefixPath + conf.path
      this.router[conf.method](routerPath, ...controllers)
    }
    this.app.use(this.router.routes())
    this.app.use(this.router.allowedMethods())
  }
}

exports.Route = Route;

const normalizePath = path => path.startsWith('/') ? path : `/${path}`

const router = conf => (target, key, decorator) => {
  conf.path = normalizePath(conf.path)
  routerMap.set({
    target: target,
    ...conf
  }, target[key])
  return decorator
}

exports.controller = path => target => (target.prototype[symbolPrefix] = path)

exports.get = path => router({
  method: 'get',
  path: path
})

exports.post = path => router({
  method: 'post',
  path: path
})

exports.put = path => router({
  method: 'put',
  path: path
})

exports.del = path => router({
  method: 'delete',
  path: path
})

exports.use = path => router({
  method: 'use',
  path: path
})

exports.all = path => router({
  method: 'all',
  path: path
})

const decorate = (args, middleware) => {
  let [ target, key, descriptor ] = args
  target[key] = isArray(target[key])
  target[key].unshift(middleware)
  return descriptor
}

const convert = middleware => (...args) => decorate(args, middleware)

exports.auth = convert(async (ctx, next) => {
  if (!ctx.session.user) {
    return (
      ctx.body = {
        success: false,
        code: 401,
        err: '登陆信息失效，请重新登录'
      }
    )
  }
  await next()
})

exports.admin = roleExpected => convert(async (ctx, next) => {
  const { role } = ctx.session.user
  if (!role || role !== roleExpected) {
    return (
      ctx.body = {
        success: false,
        code: 403,
        err: '你没有权限，来错地方了'
      }
    )
  }
  await next()
})

exports.required = rules => convert(async (ctx, next) => {
  let errors = []
  const checkRules = R.forEachObjIndexed(
    (value, key) => {
      errors = R.filter(i => {
        return !R.has(i, ctx.request[key])
      })(value)
    }
  )
  checkRules(rules)
  if (errors.length) {
    ctx.body = {
      success: false,
      code: 412,
      err: `${errors.join(',')} is required`
    }
  } else {
    await next()
  }
})
