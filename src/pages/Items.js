import React, { Component, Fragment } from 'react';
import { Input, Button, Card, List, Form } from 'antd';
import { fetchTodolistApi } from '../services/todolist';
import { getToken } from '../utils/token';
import { addtodoitemApi } from '../services/todolist';
import { deltodoitemApi } from '../services/todolist';
const { Search } = Input;
const Items = props => {
  const del = () => {
    deltodoitemApi({ itemId: 8 });
  };
  return (
    <List>
      {console.log(111111)}
      {/*{fetchTodolistApi({})}*/}
      {console.log(2222222)}
      <div>
        <Input
          onClick={() => {}}
          type="checkbox"
          style={{ width: 24, height: 24 }}
        />
        <span style={{ width: 500, height: 24 }}>xxxx</span>
        <Button
          onClick={() => {
            del;
          }}
          type="danger"
          style={{ width: 80, height: 24 }}
          icon="delete"
        >
          删除
        </Button>
      </div>
    </List>
  );
};
export default Items;
