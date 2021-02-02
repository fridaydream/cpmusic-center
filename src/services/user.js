import request from '@/utils/request'

export async function queryCurrentUser() {
  return request('/api/admin/currentUser');
}

export async function logout() {
  return request('/api/admin/logout', {
    method: 'POST',
  });
}
