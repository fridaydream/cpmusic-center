const mongoose = require('mongoose')
import { controller, get, post, put } from '../lib/decorator'
const {
  getAllMusics,
  getMusicDetail,
} = require('../service/music')

const Music = mongoose.model('Music')

@controller('/api/music')
export class movieController {
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

