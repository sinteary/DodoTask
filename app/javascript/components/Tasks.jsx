import React from "react";
import TaskEditor from "./TaskEditor";
import 'semantic-ui-css/semantic.css';
import TopBar from "./TopBar";
import AllTaskLists from "./AllTaskLists";

class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editing: false,
      taskid: null,
      refresh: false
    };
    this.disableEdit = this.disableEdit.bind(this);
    this.toggleRefresh = this.toggleRefresh.bind(this);
  }

  editTask = (id) => {
    //if current task being edited is different than prev
    if (id != this.state.taskid) {
      this.setState({
        editing: true,
        taskid: id
      })
    }
    else {
      this.disableEdit()
    }
  }

  disableEdit() {
    this.setState({
      taskid: null,
      editing: false
    })
  }

  toggleRefresh() {
    let current = this.state.refresh;
    this.setState({
      refresh: !current
    })
    console.log(this.state.refresh)
  }

  render() {
    return (
      <>
        <div className="homepage" style={{ height: '100vh' }}>
          <div className="side-taskbar" style={{ backgroundColor: this.state.editing ? '#C5F9A2' : '#98c4ff' }}>
            <TaskEditor
              taskid={this.state.taskid}
              editing={this.state.editing}
              toggleRefresh={this.toggleRefresh}
              disableEdit={this.disableEdit}>
            </TaskEditor>
          </div>
          <div className="task-display" style={{ height: '100vh', flex: '0.8' }}>
            <div className="top-menu-bar">
              <TopBar></TopBar>
            </div>

            <main className="container">
              <AllTaskLists
                taskid={this.state.taskid}
                editing={this.state.editing}
                editTask={this.editTask}
                disableEdit={this.disableEdit}
                toggleRefresh={this.toggleRefresh}
                shouldRefresh={this.state.refresh}
              >
              </AllTaskLists>

            </main>
          </div>
        </div>
      </>
    );

  }

}

export default TaskPage;