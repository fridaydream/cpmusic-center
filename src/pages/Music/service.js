import request from '@/utils/request'

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
