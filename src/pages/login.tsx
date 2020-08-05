import React, { useEffect, useState } from 'react';
import styles from './login.less';
import { Button } from 'antd';
import { loginApi } from '@/services/user';
import { isSuccess } from '@/utils/request';
import { saveToken } from '@/utils/token';
import { connect, history } from 'umi';
import { UserModelState } from '@/models/user';

interface Props {
  isLogged: boolean;
  login: (username: string, password: string) => any;
  location: {
    query: {
      redirect: string;
    };
  };
}

const Login: React.FC<Props> = props => {
  const onLogin = () => {
    props.login('aaaa', 'xxx');
  };

  useEffect(() => {
    if (props.isLogged) {
      if (props.location.query.redirect) {
        history.push(props.location.query.redirect);
      } else {
        history.push('/');
      }
    }
  }, [props.isLogged]);

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Button onClick={onLogin}>登录</Button>
    </div>
  );
};

export default connect(
  ({ user }: { user: UserModelState }) => ({
    isLogged: user.isLogged,
  }),
  dispatch => ({
    login(username: string, password: string) {
      dispatch({
        type: 'user/login',
        payload: { userName: username, passWord: password },
      });
    },
  }),
)(Login);
