import { request } from 'umi';

export async function query() {
  return request('/api/music/list');
}

export async function create(params) {
  return request('/api/admin/music/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function del(params) {
  return request('/api/admin/music/delete', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function update(params) {
  return request('/api/admin/music/update', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function logout() {
  return request('/api/admin/logout', {
    method: 'POST',
  });
}

export async function queryCurrent() {
  return request('/api/admin/currentUser');
}
