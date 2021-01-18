import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/users');
}

export async function queryCurrent() {
  return request<API.CurrentUser>('/api/admin/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/notices');
}
