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
          tasktype="not_done"
          taskid={this.props.taskid}
          editTask={this.editTask}
          disableEdit={this.props.disableEdit}
          editing={this.props.editing}
          condition={false}
        ></TaskList>
      </div>
    );

  }

}

export default AllTaskLists;