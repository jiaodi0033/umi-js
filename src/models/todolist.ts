import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { loginApi, LoginParam, LoginResult } from '@/services/user';
import { getToken, isTokenValid, saveToken } from '@/utils/token';
import { isSuccess } from '@/utils/request';

interface TodoItem {
  id: number;
  title: string;
  finished: boolean;
}

export interface TodoModelState {
  items: TodoItem[];
}

export interface TodoListType {
  namespace: 'todolist';
  state: TodoModelState;
  effects: {
    query: Effect;
    create: Effect;
    delete: Effect;
    finish: Effect;
  };
  reducers: {
    save: Reducer<TodoModelState>;
    add: Reducer<TodoModelState>;
    reduce: Reducer<TodoModelState>;
    update: Reducer<TodoModelState>;
  };
}

/**
 * 1. 登录状态检测
 * 2. 用户登录
 * 3. 用户注册
 */
const TodoListModel: TodoListType = {
  namespace: 'todolist',
  state: {
    items: [],
  },
  effects: {
    *query({ payload: { userId } }, { call, put }) {
      // yield call
      // yield put save
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...{ items: [payload.item, ...state.items] },
      };
    },
  },
};

export default TodoListModel;
