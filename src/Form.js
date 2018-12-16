import React, { Component } from "react";

class Form extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit} name="todoCreator">
        タスク: <input name="todo" /> <br />
        <input type="submit" value="送信する" />
      </form>
    );
  }
}

export default Form;
