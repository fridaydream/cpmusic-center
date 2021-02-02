import { query, create, del } from '@/pages/Music/service';

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
      yield put({
        type: 'setState',
        payload: {
          list: data.data
        },
      });
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        return true
      }
      return false
    },
    *del({ payload }, { call, put }) {
      const data = yield call(del, payload);
      if (data.success) {
        return true
      }
      return false
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
