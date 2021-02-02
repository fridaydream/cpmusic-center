import { defineConfig } from 'umi';

const outputPath = 'dist/';

const env = process.env.NODE_ENV;
const path = env === 'development' ? 'http://127.0.0.1:8000/' : '//cdn.yonyoucloud.com/cp-music-center/';

export default defineConfig({
  ssr: {
    devServerRender: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
    // hmr: false,
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/list', component: '@/pages/Music' },
    { path: '/login', component: '@/pages/User/login' },
  ],
  outputPath: outputPath,
  publicPath: path,
  proxy: {
    '/api': {
      target: 'http://localhost:7001',
      // pathRewrite: { '^/api': '' },
      changeOrigin: true
    },
  }
});
