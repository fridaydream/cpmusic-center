import { query } from '@/pages/Music/service';

const initState = () => ({
  title: '',
  list: [],
});

export default {
  namespace: 'music',
  state: { ...initState() },

  effects: {
    *query(_, { call, put }) {
      const data = yield call(query);
      console.log('data', data);
      yield put({
        type: 'saveMusicList',
        payload: data,
      });
    },
  },

  reducers: {
    test(state, { payload }) {
      state.title = 'hello umi';
    },
    saveMusicList(state = { ...initState() }, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
