import React, { useState } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import { loginApi } from '@/services/user';
import { isSuccess } from '@/utils/request';
import { saveToken } from '@/utils/token';
import { connect } from 'umi';
import { UserModelState } from '@/models/user';

interface Props {
  isLogged: boolean;
  login: (username: string, password: string) => any;
}

const IndexPage: React.FC<Props> = props => {
  //
  // const [isLogged, setIsLogged] = useState(false);
  //
  // const login = async ()=>{
  //
  //   const result = await loginApi({userName: 'aaa', passWord: 'zzz'});
  //   console.log(result);
  //   if (isSuccess(result)) {
  //     saveToken(result.data);
  //     setIsLogged(true);
  //   }
  // }
  const onLogin = () => {
    props.login('aaaa', 'xxx');
  };
  console.log('logged', props.isLogged);
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
)(IndexPage);
