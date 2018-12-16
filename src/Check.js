import React, { Component } from "react";

class Check extends Component {
  render() {
    const { task, isDone, handleUpdate, id } = this.props;
    return (
      <div className={`task-row ${isDone && "done"}`}>
        <input
          type="checkbox"
          onClick={() => handleUpdate(id, task, isDone)}
          checked={isDone}
        />
        {task}
      </div>
    );
  }
}

export default Check;
