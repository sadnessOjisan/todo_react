import React from "react";
import Check from "./Check";

class App extends React.Component {
  state = {
    todos: [],
    isFiltered: false
  };

  handleToggleFilter = e => {
    this.setState({ isFiltered: !this.state.isFiltered });
  };

  handleSubmit = e => {
    e.preventDefault();
    const inputed = e.target["task"].value;
    const newTodo = {
      id: _genUUID(),
      task: inputed,
      isDone: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  handleUpdateTaskStatus = id => {
    const updatedTodos = this.state.todos.map(todo =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    this.setState({ todos: updatedTodos });
  };

  render() {
    const { todos, isFiltered } = this.state;
    return (
      <center>
        <h1>TODO</h1>
        <form onSubmit={this.handleSubmit}>
          <input name="task" />
          <button type="submit">送信</button>
        </form>
        <button onClick={this.handleToggleFilter}>
          filterは{isFiltered ? "on" : "off"}です。
        </button>
        <p>残りタスクは{todos.filter(todo => !todo.isDone).length}個です。</p>
        <p>
          {todos
            .filter(todo => (isFiltered ? !todo.isDone : true))
            .map(todo => (
              <Check
                id={todo.id}
                task={todo.task}
                isDone={todo.isDone}
                handleUpdate={this.handleUpdateTaskStatus}
              />
            ))}
        </p>
      </center>
    );
  }
}

export default App;

const _genUUID = () => {
  return Math.random() // randomなidを生成しています
    .toString(36)
    .slice(-8);
};
