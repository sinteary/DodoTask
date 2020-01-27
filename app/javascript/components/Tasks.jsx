import React from "react";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import Axios from "axios";
import TaskEditor from "./TaskEditor";
import 'semantic-ui-css/semantic.css';
import moment from "moment";
import TopBar from "./TopBar";
import TaskList from "./TaskList"
import AllTaskLists from "./AllTaskLists";

class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editing: false,
      taskid: null
    };
    this.disableEdit = this.disableEdit.bind(this)
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

  render() {
    // const { tasks } = this.state;
    // const allTasks = tasks.map(task => (
    //   <div key={task.id} className="col-md-6 cos-lg-4">
    //     <div className="card mb-4">
    //       <div className="card-body">
    //         <div>
    //           <div className="task-checkbox">
    //             <input type="checkbox" className="done-checkbox"
    //               onChange={(e) => this.markTaskDone(e, task.id)}
    //               checked={task.done} />
    //             <label className="task-label">{task.name}</label>
    //           </div>
    //           <p>{task.description}</p>
    //           <p>{task.duedate == null ? "" :
    //             moment(task.duedate).format('DD/MM/YYYY HH:mm a')}</p>
    //           <Button floated="right" icon="alternate trash" color="red" onClick={() => this.deleteTask(task.id)} />
    //           <Button floated="right" icon="alternate pencil" color={
    //             this.state.editing && (this.state.taskid == task.id) ? "black" : "grey"}
    //             onClick={() => this.editTask(task.id)} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // ));

    return (
      <>
        <div className="homepage" style={{ height: '100vh' }}>
          <div className="side-taskbar" style={{ backgroundColor: this.state.editing ? '#C5F9A2' : '#98c4ff' }}>
            <TaskEditor
              taskid={this.state.taskid}
              editing={this.state.editing}
              refresh={this.getTasks}
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
              >
              </AllTaskLists>

              {/* <div className="row">
                {tasks.length > 0 ? allTasks : noTask}
              </div> */}
            </main>
          </div>
        </div>
      </>
    );

  }

}

export default TaskPage;