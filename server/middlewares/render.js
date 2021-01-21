const { join, extname } = require('path');

const { connect } = require('../../database/init')

const { parseCookie, parseNavLang } = require('../lib/serverHelper');

const isDev = process.env.NODE_ENV === 'development';

let render;

const addRender = async app => {
  app.use(async (ctx, next) => {
    /**
     *  扩展global对象
     *
     *  这里是在服务端处理好cookie，
     *  会把所有cookie处理成{}形式
     *  赋值到global上面，方便客户端使用
     *
     *  同时获取浏览器的默认语言，处理好
     */
    global._cookies = parseCookie(ctx);
    global._navigatorLang = parseNavLang(ctx);

    const ext = extname(ctx.request.path);
    console.log('ctx.request.path', ctx.request.path);
    // 符合要求的路由才进行服务端渲染，否则走静态文件逻辑
    if (!ext) {
      if (!render) {
        render = require('../../dist/umi.server');
      }
      const { user } = ctx.session
      if (!user && ctx.request.path === '/list') {
        // 没有登陆后台重定向
        ctx.redirect('/login');
        return;
      }
      // 这里默认是字符串渲染
      ctx.type = 'text/html';
      ctx.status = 200;
      const { html, error } = await render({
        path: ctx.request.url,
      });
      if (error) {
        console.log('----------------服务端报错-------------------', error);
        ctx.throw(500, error);
      }
      /**
       *  这里fix了由于没有使用内部server而造成的缓存问题，
       *  原因是require会带有缓存，在修改代码以后会不更新
       *  这里判断的环境变量，如果是dev环境，自动删除require
       *  缓存
       */
      if (isDev) {
        delete require.cache[require.resolve('../../dist/umi.server')];
      }
      ctx.body = html;
    } else {
      await next();
    }
  });
}

module.exports = {
  addRender
}
