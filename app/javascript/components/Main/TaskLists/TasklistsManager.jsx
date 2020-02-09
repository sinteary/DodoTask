import React from "react";
import TaskList from "./TaskList";
import 'semantic-ui-css/semantic.css';
import { Button, Modal, Form } from 'semantic-ui-react';
import Axios from "axios";

class TaskListsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: [],
      new_tasklist_name: "",
      editor_open: false,
      editing_tasklist: false,
      tasklist_id: null,
      user_id: this.props.user_id
    }
    this.onChange = this.onChange.bind(this);
    this.createTaskList = this.createTaskList.bind(this);
    this.getTaskLists = this.getTaskLists.bind(this)
    this.toggleTasklistCreator = this.toggleCreateTasklist.bind(this);
    this.toggleEditTasklist = this.toggleEditTasklist.bind(this);
    this.saveEditChanges = this.saveEditChanges.bind(this);
    this.deleteTasklist = this.deleteTasklist.bind(this);
  }

  componentDidMount() {
    this.getTaskLists();
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getTaskLists() {
    const url = `/users/${this.props.user_id}`;
    Axios.get(url)
      .then(response => {
        console.log("FETCH TASKLISTS", response.data.user.tasklists);
        this.setState({
          tasklists: response.data.user.tasklists
        })
      })
      .catch(error => {
        console.log("ERROR FETCHING TASKLISTS:", error);
      })
  }

  toggleCreateTasklist() {
    this.setState({
      editor_open: !this.state.editor_open
    })
  }

  createTaskList() {
    const url = "/tasklists";
    Axios.post(url, {
      name: this.state.new_tasklist_name,
      user_id: this.props.user_id
    })
      .then(response => {
        console.log("TASKLIST CREATED", response.data);
        this.getTaskLists();
        this.setState({
          editor_open: false
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  toggleEditTasklist(id) {
    console.log("EDIT TASKLIST " + id);
    this.setState({
      editing_tasklist: !this.state.editing_tasklist,
      tasklist_id: id
    })
  }

  editTask = (id) => {
    this.props.editTask(id);
  }

  saveEditChanges() {
    const url = `tasklists/${this.state.tasklist_id}`
    Axios.put(url, {
      name: this.state.new_tasklist_name
    })
      .then(response => {
        console.log("EDITED TASKLIST:", response);
        this.toggleEditTasklist(null);
        this.getTaskLists();
      })
      .catch(error => {
        console.log("ERROR SAVING EDITS", error);
      })
  }

  deleteTasklist() {
    console.log("DELETING:", this.state.tasklist_id);
    const url = `tasklists/${this.state.tasklist_id}`;
    Axios.delete(url)
      .then(response => {
        console.log("DELETED TASKLIST:", response);
        this.toggleEditTasklist(null);
        this.getTaskLists();
      })
      .catch(error => {
        console.log("ERROR DELETING TASKLIST:", error)
      })
  }

  //prevProps is unused, but included for proper functionality
  componentDidUpdate(prevProps, prevState) {
    if (this.state.tasklist_id !== prevState.tasklist_id) {
      console.log("EDITING TASKLIST: " + this.state.tasklist_id)
      if (this.state.editing_tasklist) {
        const url = `tasklists/${this.state.tasklist_id}`
        Axios.get(url)
          .then(response => {
            console.log("GET TASKLIST " + response.data);
            this.setState({
              new_tasklist_name: response.data.name,
            })
          })
          .catch(error => {
            console.log("EDIT TASKLIST ERROR: ", error)
          })
      } else {
        this.setState({
          new_tasklist_name: ""
        })
      }
    }
  }

  render() {
    //Maps all tasklists data retrieved to individual TaskList components
    const allTaskLists = this.state.tasklists.map(tasklist => (
      <div key={tasklist.id} className="tasklist-container">
        <TaskList
          key={tasklist.id}
          name={tasklist.name}
          addTask={() => this.props.addTask(tasklist.id)}
          tasklist_id={tasklist.id}
          editTask={this.editTask}
          toggleRefresh={this.props.toggleRefresh}
          shouldRefresh={this.props.shouldRefresh}
          toggleEditTasklist={this.toggleEditTasklist}
        />
      </div>
    ));

    return (
      <div className="main-body">
        <Modal
          size="small"
          open={this.state.editor_open || this.state.editing_tasklist}
          trigger={
            <div className="add-list-button">
              <Button
                onClick={this.toggleCreateTasklist}
                content="Add a new list"
                icon="plus"
                labelPosition="left"
              />
            </div>
          }>
          <Modal.Header>{this.state.editing_tasklist ? "Edit tasklist:" : "Create a new tasklist"}</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label htmlFor="tasklistName">Name</label>
                <input
                  type="text"
                  name="new_tasklist_name"
                  id="tasklistName"
                  required
                  value={this.state.new_tasklist_name}
                  onChange={(data) => {
                    this.onChange(data);
                  }}
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button
              floated="left"
              icon="alternate trash"
              color="red"
              onClick={this.deleteTasklist} />
            <Button
              color='green'
              onClick={this.state.editing_tasklist ? this.saveEditChanges : this.createTaskList}>
              {this.state.editing_tasklist ? "Save changes" : "Create"}
            </Button>
            <Button
              onClick={this.state.editing_tasklist ? this.toggleEditTasklist : this.toggleCreateTasklist}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
        <div className="scroll_taskdisplay">
          {this.state.tasklists.length > 0 ? allTaskLists : "Add a new tasklist to start tracking tasks!"}
        </div>
      </div >
    );

  }

}

export default TaskListsManager;