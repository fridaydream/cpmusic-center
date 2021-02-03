import { query, create, del, getCategorys } from '@/pages/Music/service';

const initState = () => ({
  title: '',
  list: [],
  categoryList: []
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
    *queryCategorys(_, { call, put }) {
      const data = yield call(getCategorys);
      yield put({
        type: 'setState',
        payload: {
          categoryList: data.data
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
      return {
        ...state,
        ...payload,
      };
    },
  },
};
