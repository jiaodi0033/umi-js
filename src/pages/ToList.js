import React, { useEffect } from 'react';
import { Input, Button, Card, List, Form } from 'antd';
import {
  deltodoitemApi,
  fetchTodolistApi,
  updatetodolistApi,
} from '../services/todolist';
import { useState } from 'react';
import { addtodoitemApi } from '../services/todolist';
import { isSuccess } from '../utils/request';
import { connect } from 'umi';
import './App.less';
import './login.less';

const ToList = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchTodolistApi({}).then(value => {
      if (isSuccess(value)) {
        setList(value.data);
      }
    });
  }, []);
  const upDate = () => {
    fetchTodolistApi({}).then(value => {
      if (isSuccess(value)) {
        setList(value.data);
      }
    });
  };
  const onFinish = s => {
    Add(s.description, false);
    s.description = '';
  };

  const Add = (description, finished) => {
    addtodoitemApi({ description, finished }).then(value => {
      alert(value.msg);
      upDate();
    });
  };
  const Del = itemId => {
    console.log(itemId);
    deltodoitemApi({ itemId }).then(value => {
      console.log(value.msg);
      alert(value.msg);
      upDate();
    });
  };
  const Change = (id, description, finished) => {
    console.log('======');
    updatetodolistApi({
      itemId: id,
      description: description,
      finished: !finished,
    }).then(value => {
      alert(value.msg);
      upDate();
    });
  };
  const Exit = () => {
    localStorage.clear();
  };
  // useEffect(() => {
  //   props.fetch();
  // }, []);

  return (
    <Card
      title="TodoList"
      style={{ background: 'gainsboro', textAlign: 'center' }}
      extra={
        <div>
          <span>欢迎登录</span>
          <br />
          <Button style={{ padding: -20 }} onClick={() => Exit()}>
            <a href="http://192.168.1.11:8002/todolist">退出</a>
          </Button>
        </div>
      }
    >
      <Form name="add" onFinish={onFinish}>
        <Form.Item
          label=""
          name="description"
          rules={[{ required: true, message: 'Please input something!' }]}
        >
          <Input placeholder="请输入内容" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
      <List style={{ background: '#fdfafc', height: 400, overflow: 'auto' }}>
        {list.map(item => (
          <div key={item.itemId}>
            <List.Item>
              <Button
                type="primary"
                onClick={() =>
                  Change(item.itemId, item.description, item.finished)
                }
                className={item.finished ? 'Yes' : 'No'}
                style={{ marginRight: 10, width: 45 }}
                size="small"
                icon={item.finished ? '已完成' : '待做'}
              />
              <span className={item.finished ? 'ok' : 'no'}>
                {item.description}
              </span>
              <Button
                type="danger"
                onClick={() => Del(item.itemId)}
                style={{ marginRight: 10 }}
                size="small"
                icon="del"
              />
            </List.Item>
          </div>
        ))}
      </List>
    </Card>
  );
};
export default connect(
  ({ todolist }) => ({
    items: todolist.data,
  }),
  dispatch => ({
    fetch() {
      dispatch({
        type: 'todolist/get',
      });
    },
  }),
)(ToList);
