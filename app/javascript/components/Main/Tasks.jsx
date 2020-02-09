import React from "react";
import TaskEditor from "./TaskEditor";
import 'semantic-ui-css/semantic.css';
import TopBar from "./TopBar";
import TaskListsManager from "./TaskLists/TasklistsManager";
import SearchManager from "./SearchManager";
import { Sidebar } from 'semantic-ui-react';

class TaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editing: false,
      adding: false,
      taskid: null,
      tasklistid: null,
      refresh: false,
      search: false
    };
    this.disableEdit = this.disableEdit.bind(this);
    this.toggleRefresh = this.toggleRefresh.bind(this);
    this.addTask = this.addTask.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.disableSearch = this.disableSearch.bind(this);
  }

  editTask = (id) => {
    //if current task being edited is different than prev
    if (id != this.state.taskid) {
      this.setState({
        editing: true,
        adding: false,
        taskid: id
      })
    }
    else {
      this.disableEdit()
    }
  }

  disableEdit() {
    console.log("DISABLE EDIT ACTIVATED");
    this.setState({
      taskid: null,
      editing: false,
      adding: false
    })
  }

  toggleRefresh() {
    let current = this.state.refresh;
    this.setState({
      refresh: !current
    })
    console.log("REFRESH?", this.state.refresh)
  }

  addTask(tasklist_id) {
    console.log("ADD TASK PRESSED");
    console.log("FOR TASKLIST" + tasklist_id);
    this.setState({
      tasklistid: tasklist_id,
      taskid: null,
      adding: true,
      editing: false
    })
  }

  toggleSearch() {
    console.log("SEARCH TOGGLED")
    this.setState({
      search: true
    })
  }

  disableSearch() {
    console.log("SEARCH DISABLED")
    this.setState({
      search: false
    })
  }

  render() {
    return (
      <>
        <div className="homepage" style={{ height: '100vh' }}>
          <div className="side-taskbar">
            <Sidebar.Pushable>
              <Sidebar
                animation='overlay'
                visible={this.state.adding || this.state.editing}
                vertical="true"
              >
                <TaskEditor
                  taskid={this.state.taskid}
                  tasklistid={this.state.tasklistid}
                  editing={this.state.editing}
                  adding={this.state.adding}
                  toggleRefresh={this.toggleRefresh}
                  disableEdit={this.disableEdit}
                  user_id={this.props.user_id}
                >
                </TaskEditor>
              </Sidebar>
              <Sidebar.Pusher>
                <div className="side-taskbar" />
              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>

          <div className="task-display">
            <div className="top-menu-bar">
              <TopBar
                toggleSearch={this.toggleSearch}
                disableSearch={this.disableSearch}
              />
            </div>
            {this.state.search ?
              <SearchManager
                user_id={this.props.user_id}
                editTask={this.editTask}
                getTasks={this.toggleRefresh}
                toggleRefresh={this.toggleRefresh}
                shouldRefresh={this.state.refresh}
              />
              :
              <div className="main-body">
                <TaskListsManager
                  user_id={this.props.user_id}
                  taskid={this.state.taskid}
                  editing={this.state.editing}
                  editTask={this.editTask}
                  disableEdit={this.disableEdit}
                  toggleRefresh={this.toggleRefresh}
                  shouldRefresh={this.state.refresh}
                  addTask={this.addTask} />
              </div>
            }
          </div>

        </div>
      </>
    );

  }

}

export default TaskPage;