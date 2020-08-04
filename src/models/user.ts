import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { loginApi, LoginParam, LoginResult } from '@/services/user';
import { saveToken } from '@/utils/token';
import { isSuccess } from '@/utils/request';

export interface UserModelState {
  isLogged: boolean;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
  };
  reducers: {
    setIsLogged: Reducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: UserModelType = {
  namespace: 'user',
  state: {
    isLogged: false,
  },
  effects: {
    *login({ payload: { userName, passWord } }, { call, put }) {
      const result: LoginResult = yield call(loginApi, {
        userName,
        passWord,
      } as LoginParam);
      if (isSuccess(result)) {
        saveToken(result.data);
        yield put({ type: 'setIsLogged', payload: true });
      }
    },
  },
  reducers: {
    setIsLogged(state, action) {
      return {
        ...state,
        ...{
          isLogged: action.payload,
        },
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {},
  },
};
export default IndexModel;
