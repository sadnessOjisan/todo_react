import React, { Component } from "react";
import Check from "./Check";
import Form from "./Form";
import "./App.css";

const HOST_URL = "http://localhost:3000";

/**
 * 1. serverからデータを取得するときは、関数名の最初にasyncを付けて、データを取得する箇所でawaitを付けるよ（上手くデータを取るためのおまじない）
 * 2. const a = hoge.a は const {a} = hoge と書くことができるよ。短くなって嬉しいね！
 */

class App extends Component {

  // このコンポーネントが持つ状態とデータ
  state = {
    todos: [],
    isFiltered: false
  };

  /**
   * チェック済みのもの可視不可視を切り替えるためのfilterのON/OFF
   */
  handleToggleFilter = e => {
    // todo: ここでisFilteredの状態をsetState関数で更新してください
  };

  /**
   * formに書かれた内容をサーバーに送り、todo一覧に追加する処理
   */
  async handleSubmit(e) {
    e.preventDefault();
    const inputed = e.target["todo"].value; // formに入力された値を取り出すよ
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
    // todo: ここでtodosの状態を更新してください
  }

  // checkboxにチェックを入れた時に実行される処理
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

  /**
   * componentが準備された時に自動で呼ばれる関数
   */
  async componentDidMount() {
    // serverからデータを取得するから魔法のawaitを使うよ！
    const response = await fetch(`${HOST_URL}/todos`, {
      method: "GET"
    });
    const data = await response.json();
    // todo: ここでtodosの状態を更新してください
  }

  render() {
    const {isFiltered } = this.state; // todo: stateからisFilteredだけでなくtodosも取り出してください
    const todos = [] // todo: stateからtodosを取り出したらこの行を消してください
    const filteredTodos = isFiltered
      ? todos.filter(todo => !todo.isDone)
      : todos;
    return (
      <div>
        <h1>Todo</h1>
        {/* todo: ここに入力フォームコンポーネントを入れてください. submit時の処理もpropsとして渡してあげてね */}
        <button onClick={this.handleToggleFilter}>
          フィルター
          {isFiltered ? "ONです" : "OFFです"}
        </button>
        <p>
          残り
          {todos.filter(todo => !todo.isDone).length}個
        </p>
        {/* ↓↓配列からコンポーネントを複製するよ↓↓ */}
        {filteredTodos.map(d => (
          <Check
            // todo: id, task, isDoneをpropsとして渡してあげてね
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
