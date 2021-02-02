const Router = require('koa-router')
const router = new Router()
const { controller, get, post, put, del, auth, admin, required } = require('../lib/decorator')
const {
  checkPassword,
  updateUserMusic,
  getAllUser
} = require('../service/user')

const {
  findAndRemove,
  createMusic,
  updateMusicById
} = require('../service/music')

@controller('/api/admin')
class adminController {
  @post('/music/create')
  @auth
  async createMusic(ctx, next) {
    const { user } = ctx.session
    const { url, cover, author, name } = ctx.request.body
    const result = await createMusic({ url, cover, author, name, user: user._id });
    const result2 = await updateUserMusic(user._id, result._id);
    if (result && result2) {
      ctx.body = {
        success: true
      }
      return;
    }
    return ctx.body = {
      success: true
    }
  }

  @post('/music/update')
  @auth
  @required({
    body: ['id']
  })
  async updateMusic (ctx, next) {
    const { user } = ctx.session
    const { id, url, cover, author, name } = ctx.request.body
    await updateMusicById({ id, url, cover, author, name, user: user._id });
    ctx.body = {
      success: true
    }
  }

  @del('/music/delete')
  @auth
  @admin('admin')
  @required({
    body: ['id']
  })
  async remove(ctx, next) {
    const { id } = ctx.request.body
    const music = await findAndRemove(id)
    ctx.body = {
      success: true
    }
  }

  @post('/login')
  @required({
    body: ['email', 'password']
  })
  async login (ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户不存在'
      })
    }
    if (matchData.match) {
      const user = {
        _id: matchData.user._id,
        email: matchData.user.email,
        role: matchData.user.role,
        username: matchData.user.username
      };
      ctx.session.user = user;
      return (ctx.body = {
        success: true,
        data: user
      })
    }
    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }

  @get('/currentUser')
  async getCurrentUser(ctx, next) {
    const { user } = ctx.session
    if (!user) {
      return (ctx.body = {
        success: false,
        err: '未登陆'
      })
    }
    return (ctx.body = {
      success: true,
      data: user
    })
  }

  @post('/logout')
  async logout (ctx, next) {
    ctx.session.user = null;
    return ctx.body = {
      success: true,
    }
  }

  @get('/getAllUser')
  async getAllUser(ctx) {
    const data = await getAllUser();
    return ctx.body = {
      success: true,
      data
    }
  }
}

module.exports = {
  adminController
}

