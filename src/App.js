import React, { Component } from "react";
import Check from "./Check";
import Form from "./Form";
import "./App.css";

const HOST_URL = "http://localhost:3000";

class App extends Component {
  state = {
    todos: [],
    isFiltered: false
  };

  async componentDidMount() {
    const response = await fetch(`${HOST_URL}/todos`, {
      method: "GET"
    });
    const data = await response.json();
    this.setState({ todos: data });
  }

  handleToggleFilter = e => {
    this.setState({ isFiltered: !this.state.isFiltered });
  };

  async handleSubmit(e) {
    e.preventDefault();
    const inputed = e.target["todo"].value;
    const response = await fetch(`${HOST_URL}/todos`, {
      method: "POST",
      body: JSON.stringify({
        task: inputed,
        isDone: false
      }),
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    this.setState({
      todos: [...this.state.todos, data]
    });
  }

  async handleUpdateTaskStatus(id, task, currentStatus) {
    const nextStatus = !currentStatus;
    const response = await fetch(`${HOST_URL}/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        task,
        isDone: nextStatus
      }),
      headers: {
        "content-type": "application/json"
      }
    });
    const data = await response.json();
    this.setState({
      todos: this.state.todos.map(todo => (todo.id === id ? data : todo))
    });
  }

  render() {
    const { todos, isFiltered } = this.state;
    const filteredTodos = isFiltered
      ? todos.filter(todo => !todo.isDone)
      : todos;
    return (
      <div>
        <h1>Todo</h1>
        <Form handleSubmit={e => this.handleSubmit(e)} />
        <button onClick={this.handleToggleFilter}>
          フィルター
          {isFiltered ? "ONです" : "OFFです"}
        </button>
        <p>
          残り
          {todos.filter(todo => !todo.isDone).length}個
        </p>
        {filteredTodos.map(d => (
          <Check
            id={d.id}
            task={d.task}
            isDone={d.isDone}
            handleUpdate={(id, task, isDone) =>
              this.handleUpdateTaskStatus(id, task, isDone)
            }
          />
        ))}
      </div>
    );
  }
}

export default App;
