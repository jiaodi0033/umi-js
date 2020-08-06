import React from 'react';

class TodoItem extends React.Component {
  deleteTask(name) {
    this.props.deleteItem(name);
  }
  completeTask(name) {
    this.props.completeTask(name);
  }
  render() {
    return (
      <ul>
        {this.props.data.map(element => {
          return (
            <li className="listItem" key={Math.random()}>
              <input
                type="checkbox"
                checked={element.status === 1}
                onChange={this.completeTask.bind(this, element.name)}
              />
              <span
                style={{
                  textDecorationLine:
                    element.status === 0 ? 'none' : 'line-through',
                }}
              >
                {element.name}
              </span>
              <button
                className="delete"
                onClick={this.deleteTask.bind(this, element.name)}
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default TodoItem;
