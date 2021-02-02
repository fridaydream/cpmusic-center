import { queryCurrentUser, logout } from '@/services/user';

import { fakeAccountLogin } from '@/services/login';

const initState = () => ({
  currentUser: {},
});

export default {
  namespace: 'user',
  state: { ...initState() },

  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(fakeAccountLogin, payload);
      if (data && data.success) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: data.data
          },
        });
        return true;
      }
      return false;
    },
    *queryCurrentUser(_, { call, put }) {
      const data = yield call(queryCurrentUser);
      console.log('data===', data);
      if (data && data.success) {
        yield put({
          type: 'setState',
          payload: {
            currentUser: data.data
          },
        });
      }
    },
    *logout(_, { call, put }) {
      const data = yield call(logout);
      if (data.success) {
        return true;
      }
      return false;
    },
  },

  reducers: {
    setState(state, { payload }) {
      console.log('payload===', payload);
      return {
        ...state,
        ...payload,
      };
    },
  },
};
