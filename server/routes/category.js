const mongoose = require('mongoose')

const { controller, get } = require('../lib/decorator')

const {
  getAllCategorys
} = require('../service/category')

@controller('/api/category')
class categoryController {
  @get('/list')
  async getCategorys (ctx, next) {
    const category = await getAllCategorys()
    ctx.body = {
      success: true,
      data: category
    }
  }
}

module.exports = {
  categoryController
}
