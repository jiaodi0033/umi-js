import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { history } from 'umi';
import { registerApi } from '@/services/user';
import { isSuccess } from '@/utils/request';
import './login.less';

interface Props {}

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Register: React.FC<Props> = props => {
  const onFinish = async (s: any) => {
    if (s.passWord != s.rpassWord) {
      alert('密码不一致请重新输入');
    } else {
      const result = await registerApi({
        userName: s.userName,
        passWord: s.passWord,
      });
      if (isSuccess(result)) {
        alert(result.msg);
        history.push('/login');
      } else {
        alert(result.msg);
      }
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ width: 300 }}>
        <h1 style={{ textAlign: 'center', width: '100%' }}>注册界面</h1>

        <Form {...layout} name="login" onFinish={onFinish}>
          <Form.Item
            className="Name"
            label="用户名："
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            className="Pswd"
            label="密码 ："
            name="passWord"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="密码6-20位字符"
              style={{ paddingLeft: 20 }}
            />
          </Form.Item>
          <Form.Item
            label="确认密码："
            name="rpassWord"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="再次输入密码" />
          </Form.Item>
          <Form.Item>
            <Row justify="space-around">
              <Button type="default" onClick={() => history.goBack()}>
                返回
              </Button>
              <Button type="primary" htmlType="submit">
                注册
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
