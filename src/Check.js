import React from "react";

class Check extends React.Component {
  render() {
    const { task, isDone, handleUpdate, id } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          onClick={() => handleUpdate(id)}
          checked={isDone}
        />
        {task}
      </div>
    );
  }
}

export default Check;
