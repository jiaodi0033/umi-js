/**
 * 封装API
 * - Token携带
 * - 401自动跳转
 * - 5xx/4xx自动提示
 **/

import { extend } from 'umi-request';
import { history } from 'umi';
import { getToken, isTokenValid } from '@/utils/token';

const request = extend({});

/**
 * 当存在token时，为请求头设置 Authornization 字段
 */
request.interceptors.request.use(
  (url, options) => {
    const localToken = getToken();

    if (localToken !== null && isTokenValid(localToken)) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${localToken.token}`,
      };
    }

    console.log(options);
    return { url, options };
  },
  { global: false },
);

/**
 * 当返回状态码为401时，进入登录逻辑
 */
request.interceptors.response.use(
  (response, options) => {
    if (response.status == 401) {
      history.push('./login');
    }
    return response;
  },
  { global: false },
);

/**
 * 当返回状态码为4xx/5xx时, xxxxx
 */
request.interceptors.response.use(
  (response, options) => {
    if (response.status == 403 || response.status == 500) {
      alert('请求错误！！！');
    }
    return response;
  },
  { global: false },
);

/**
 * 接口数据返回格式
 */
export interface Result<T> {
  data: T;
  msg: string;
  code: number;
}

export function isSuccess(result: Result<any>) {
  return result.code === 0;
}

export default request;
