import React from 'react';
import { Button, Form, Input, Row } from 'antd';
import { history } from 'umi';
import { registerApi } from '@/services/register';
import { isSuccess } from '@/utils/request';

interface Props {}

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

const Register: React.FC<Props> = props => {
  const onFinish = async (s: any) => {
    const result = await registerApi({
      userName: s.userName,
      passWord: s.passWord,
    });
    if (isSuccess(result)) {
      history.push('/login');
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
      <div style={{ width: 200 }}>
        <h2 style={{ textAlign: 'center', width: '100%' }}>注册</h2>

        <Form {...layout} name="login" onFinish={onFinish}>
          <Form.Item
            label=""
            name="userName"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="用户名" />
          </Form.Item>

          <Form.Item
            label=""
            name="passWord"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="密码" />
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
