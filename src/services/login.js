import { request } from 'umi';

export async function fakeAccountLogin(params) {
  return request('/api/admin/login', {
    method: 'POST',
    data: params,
  });
}

