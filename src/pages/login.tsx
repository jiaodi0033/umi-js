import React, { useEffect, useState } from 'react';
import './login.less';
import { Button, Form, Input, Row } from 'antd';
import { loginApi } from '@/services/user';
import { isSuccess } from '@/utils/request';
import { saveToken } from '@/utils/token';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
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

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 30 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC<Props> = props => {
  useEffect(() => {
    if (props.isLogged) {
      if (props.location.query.redirect) {
        history.push(props.location.query.redirect);
      } else {
        history.push('/');
      }
    }
  }, [props.isLogged]);
  const [form] = Form.useForm();
  const onFinish = (s: any) => {
    props.login(s.userName, s.passWord);
    form.setFieldsValue({ userName: '', passWord: '' });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#eeeae4',
      }}
    >
      <div style={{ width: 250 }}>
        <h1 style={{ textAlign: 'center', width: '100%' }}>登录界面</h1>
        <Form {...layout} name="login" form={form} onFinish={onFinish}>
          <Form.Item
            label=""
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="用户名"
            />
          </Form.Item>

          <Form.Item
            label=""
            name="passWord"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="密码"
            />
          </Form.Item>

          <Form.Item>
            <Row justify="space-around">
              <Button type="default" onClick={() => history.push('/register')}>
                注册
              </Button>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
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
