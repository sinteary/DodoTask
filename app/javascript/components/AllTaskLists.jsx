import React from "react";
import TaskList from "./TaskList";

class AllTaskLists extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   editing: false,
    //   taskid: null
    // };
    // this.editTask = this.editTask.bind(this);
    // this.disableEdit = this.disableEdit.bind(this);
  }

  editTask = (id) => {
    this.props.editTask(id);
  }

  // disableEdit() {
  //   this.props.disableEdit();
  // }

  render() {

    return (
      <div>
        <TaskList
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