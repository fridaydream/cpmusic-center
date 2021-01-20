const { Route } = require('../lib/decorator')
const { resolve } = require('path')
const { connect } = require('../../database/init')

exports.router = async app => {
  await connect();
  const apiPath = resolve(__dirname, '../routes')
  const router = new Route(app, apiPath)
  router.init()
}

