import React, { useEffect } from 'react';
import { Input, Button, Card, List, Form, Tooltip } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  InfoOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

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
    // (async ()=>{
    //   const result = await fetchTodolistApi({});
    //   if (isSuccess(value)) {
    //     setList(value.data);
    //   }
    // })();

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
  const [form] = Form.useForm();
  const onFinish = s => {
    Add(s.description, false);
    form.setFieldsValue({ description: '' });
  };

  const Add = (description, finished) => {
    addtodoitemApi({ description, finished }).then(value => {
      console.log(value);
      setList([value.data, ...list]);
      // upDate()
    });
  };
  const Del = (itemId, index) => {
    console.log('======' + index);
    deltodoitemApi({ itemId }).then(value => {
      // console.log(value.msg);
      list.splice(index, 1);
      console.log(list);
      setList([...list]);
    });
  };
  const Change = (id, description, finished, index) => {
    updatetodolistApi({
      itemId: id,
      description: description,
      finished: !finished,
    }).then(value => {
      console.log(value.data);
      list.splice(index, 1);
      setList([...list, value.data]);
    });
  };
  const Exit = () => {
    props.logout();
  };

  return (
    <Card
      title={<h2>TodoList</h2>}
      headStyle={{ background: 'gray' }}
      style={{ background: 'gainsboro', textAlign: 'center', height: '100%' }}
      extra={
        <div>
          <Tooltip title="退出">
            <Button onClick={() => Exit()} icon={<UserSwitchOutlined />} />
          </Tooltip>
        </div>
      }
    >
      <Form name="add" layout="inline" form={form} onFinish={onFinish}>
        <Form.Item
          style={{ width: '80%' }}
          label=""
          name="description"
          rules={[{ required: true, message: 'Please input something!' }]}
        >
          <Input placeholder="请输入待办事项" />
        </Form.Item>
        <Form.Item>
          <Tooltip title="添加">
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<PlusOutlined />}
            />
          </Tooltip>
        </Form.Item>
      </Form>
      <br />
      <List style={{ background: '#fdfafc', height: 400, overflow: 'auto' }}>
        {list.map((item, index) => (
          <div key={index}>
            <List.Item>
              <Tooltip title="切换状态！">
                <Button
                  type="primary"
                  onClick={() =>
                    Change(item.itemId, item.description, item.finished, index)
                  }
                  className={item.finished ? 'Yes' : 'No'}
                  // shape='circle'
                  size="small"
                  // icon={item.finished ? '已完成' : '待办 '}
                  icon={item.finished ? <CheckOutlined /> : <InfoOutlined />}
                />
              </Tooltip>
              <span className={item.finished ? 'ok' : 'no'}>
                {item.description}
              </span>
              <Tooltip title="删除">
                <Button
                  type="danger"
                  onClick={() => Del(item.itemId, index)}
                  size="small"
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
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
    logout() {
      dispatch({
        type: 'user/logout',
      });
    },
  }),
)(ToList);
