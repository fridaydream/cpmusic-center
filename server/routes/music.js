const mongoose = require('mongoose')
const { controller, get } = require('../lib/decorator')

const {
  getAllMusics,
  getMusicDetail,
} = require('../service/music')

@controller('/api/music')
class musicController {
  @get('/list')
  async getMusics (ctx, next) {
    const musics = await getAllMusics()
    ctx.body = {
      success: true,
      data: musics
    }
  }

  @get('/detail/:id')
  async getMusicDetail (ctx, next) {
    const id = ctx.params.id
    const music = await getMusicDetail(id)
    ctx.body = {
      data: {
        music
      },
      success: true
    }
  }
}


module.exports = {
  musicController
}
