import React from 'react';
import ListItem from './TodoItem';
import './App.less';
// import styles from './index.less';
import { Button, Form, Input } from 'antd';
import TodoItem from './TodoItem';
class List extends React.Component {
  constructor() {
    super();
    this.state = {
      list: [],
      inputVal: '',
    };
  }
  addTask() {
    if (!this.state.inputVal) return;
    this.setState({
      list: [
        ...this.state.list,
        {
          name: this.state.inputVal,
          status: 0,
        },
      ],
      inputVal: '',
    });
  }
  handleChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }
  deleteItem(name) {
    const data = this.state.list.filter(element => element.name !== name);
    this.setState({
      list: data,
    });
  }
  completeTask(name) {
    const TodoList = [];
    this.state.list.forEach((element, index) => {
      if (element.name === name) {
        const item = this.state.list[index];
        TodoList.push(
          Object.assign({}, item, { status: item.status === 0 ? 1 : 0 }),
        );
        this.setState({
          list: TodoList,
        });
      } else {
        TodoList.push(element);
      }
    });
  }
  render() {
    return (
      <div>
        <footer>
          <input
            type="text"
            value={this.state.inputVal}
            onChange={this.handleChange.bind(this)}
            placeholder="添加todo"
            style={{ flex: 1 }}
          />
          <button className="addTodo" onClick={this.addTask.bind(this)}>
            添加
          </button>
        </footer>
        <header className="header">
          <h2>TodoList</h2>
        </header>
        <div className="reactTodoList">
          <TodoItem
            data={this.state.list}
            deleteItem={this.deleteItem.bind(this)}
            completeTask={this.completeTask.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default List;
