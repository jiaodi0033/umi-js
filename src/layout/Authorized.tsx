import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { UserModelState } from '@/models/user';
import { Loading } from '@@/plugin-dva/connect';
import { Spin } from 'antd';
interface Props {
  isAutoLogging: boolean;
  isLogged: boolean;

  location: {
    pathname: string;
  };
}

/**
 * 用户必须登录，未登录用户会导向登录页面 "/login"
 *
 * 状态:
 *  1. 自动登录中
 *  2. 不在自动登录中，未登录
 *  3. 不在自动登录中，已登录
 *
 * @param props
 * @constructor
 */
const Authorized: React.FC<Props> = props => {
  useEffect(() => {
    if (!props.isAutoLogging && !props.isLogged) {
      history.push(
        `/login?redirect=${encodeURIComponent(props.location.pathname)}`,
      );
    }
  }, [props.isLogged, props.isAutoLogging]);

  return (
    <div>
      {props.isAutoLogging ? '加载中...' : props.isLogged ? props.children : ''}
    </div>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => ({
    isLogged: user.isLogged,
    isAutoLogging: !!loading.effects['user/autoLogin'],
  }),
)(Authorized);
