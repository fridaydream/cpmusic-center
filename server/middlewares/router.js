const { Route } = require('../lib/decorator')
const { resolve } = require('path')

const addRouter = async app => {
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)
  router.init()
}

module.exports = {
  addRouter
}
