import { defineConfig } from 'umi';

const outputPath = 'dist/';

const env = process.env.NODE_ENV;
const path = env === 'development' ? 'http://127.0.0.1:8000/' : '//cdn.yonyoucloud.com/cp-music-center/';

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: outputPath,
  publicPath: path,
  routes: [
    { path: '/', component: '@/pages/index' },
    // {
    //   path: '/user',
    //   layout: false,
    //   routes: [
    //     {
    //       path: '/user',
    //       routes: [
    //         {
    //           name: 'login',
    //           path: '/user/login',
    //           component: '@/pages/User/login',
    //         },
    //       ],
    //     },
    //   ],
    // },
    { path: '/login', component: '@/pages/User/login' },
    { path: '/list', component: '@/pages/Music' },
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      // pathRewrite: { '^/api': '' },
      changeOrigin: true
    },
  }
});
