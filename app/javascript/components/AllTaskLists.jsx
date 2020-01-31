import React from "react";
import TaskList from "./TaskList";

class AllTaskLists extends React.Component {
  constructor(props) {
    super(props);
  }

  editTask = (id) => {
    this.props.editTask(id);
  }

  render() {
    return (
      <div>
        <TaskList
          tasktype=""
          condition={false}
          editTask={this.editTask}
          toggleRefresh={this.props.toggleRefresh}
          shouldRefresh={this.props.shouldRefresh}
        ></TaskList>
      </div>
    );

  }

}

export default AllTaskLists;