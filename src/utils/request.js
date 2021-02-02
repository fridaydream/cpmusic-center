import { request, isBrowser } from 'umi';
import { message } from 'antd';
import qs from 'qs';
const fetch = (url, option = {}) => {
  const { params = {}, ...restOpts } = option || {};
  const paramsStr = params
    ? qs.stringify(params)
    : '';
  // https://github.com/bitinn/node-fetch/issues/481，因为服务端 fetch 是 node-fetch，node-fetch 只支持绝对路径，所以判断下不是浏览器要拼接服务端地址，global.host 后面我们会在 egg 里赋值
  // const reqUrl = `${
  //   isBrowser() ? '' : `${global.host || 'http://localhost:7001'}` // https://cpmusic-center.fridaydream.vercel.app
  // }${url}${paramsStr}`;
  const reqUrl = `${
    isBrowser() ? '' : `${global.host || 'https://cpmusic-center.fridaydream.vercel.app'}`
  }${url}${paramsStr}`;
  console.log('reqUrl', reqUrl);
  return request(reqUrl, restOpts).catch(e => {
    console.error('e', e);
    if (typeof window !== 'undefined' && !window.USE_PRERENDER) {
      message.error('请求错误');
    }
  });
};

export default fetch;
