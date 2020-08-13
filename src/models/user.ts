import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { loginApi, LoginParam, LoginResult } from '@/services/user';
import { getToken, isTokenValid, saveToken } from '@/utils/token';
import { isSuccess } from '@/utils/request';
import { history } from 'umi';

export interface UserModelState {
  isLogged: boolean;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    autoLogin: Effect;
  };
  reducers: {
    setIsLogged: Reducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}

/**
 * 1. 登录状态检测
 * 2. 用户登录
 * 3. 用户注册
 */
const IndexModel: UserModelType = {
  namespace: 'user',
  state: {
    isLogged: false,
  },
  effects: {
    /**
     * 自动登录, 判断当前本地Token是否有效，有效则转为已登录状态(isLogged)
     */
    *autoLogin(_, { put, call }) {
      const token = getToken();

      // 模拟耗时1000ms
      yield call(
        () =>
          new Promise(resolve => {
            setTimeout(resolve, 1000);
          }),
      );

      if (isTokenValid(token)) {
        yield put({ type: 'setIsLogged', payload: true });
      }
    },
    *login({ payload: { userName, passWord } }, { call, put }) {
      const result: LoginResult = yield call(loginApi, {
        userName,
        passWord,
      } as LoginParam);
      if (isSuccess(result)) {
        saveToken(result.data);
        alert(result.msg);
        yield put({ type: 'setIsLogged', payload: true });
      } else {
        alert('用户名或密码错误，请重新输入');
        history.push('/');
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
    setup({ dispatch, history }) {
      dispatch({
        type: 'autoLogin',
      });
    },
  },
};

export default IndexModel;
