import React from "react";
import TaskList from "./TaskList";
import { Grid, Button, Icon, Modal, Form } from 'semantic-ui-react';
import Axios from "axios";

class TaskListsManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: [],
      new_tasklist_name: "",
      editor_open: false,
      editing_tasklist: false,
      tasklist_id: null
    }
    this.onChange = this.onChange.bind(this);
    this.createTaskList = this.createTaskList.bind(this);
    this.getTaskLists = this.getTaskLists.bind(this)
    this.toggleTasklistCreator = this.toggleTasklistCreator.bind(this);
    this.toggleEditTasklist = this.toggleEditTasklist.bind(this);
    this.saveEditChanges = this.saveEditChanges.bind(this);
  }

  toggleTasklistCreator() {
    this.setState({
      editor_open: !this.state.editor_open
    })
  }

  createTaskList() {
    const url = "/tasklists";
    Axios.post(url, {
      name: this.state.new_tasklist_name
    })
      .then(response => {
        console.log(response);
        this.getTaskLists();
        this.setState({
          editor_open: false
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  getTaskLists() {
    const url = "/tasklists";
    Axios.get(url)
      .then(response => {
        console.log("FETCH TASKLISTS", response.data);
        this.setState({
          tasklists: response.data,
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.getTaskLists();
  }

  editTask = (id) => {
    this.props.editTask(id);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  toggleEditTasklist(id) {
    console.log("EDIT TASKLIST" + id);
    this.setState({
      editing_tasklist: !this.state.editing_tasklist,
      tasklist_id: id
    })
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
        console.log(error);
      })
  }

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
        >
        </TaskList>
      </div>
    ));

    return (
      <div className="main-body">
        <Modal
          size="small"
          open={this.state.editor_open || this.state.editing_tasklist}
          trigger={
            <Button
              onClick={this.toggleTasklistCreator}
              content="Add a new list"
              icon="plus"
              labelPosition="left">
            </Button>}>
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
              color='green'
              onClick={this.state.editing_tasklist ? this.saveEditChanges : this.createTaskList}>
              {this.state.editing_tasklist ? "Save changes" : "Create"}
            </Button>
            <Button
              onClick={this.state.editing_tasklist ? this.toggleEditTasklist : this.toggleTasklistCreator}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
        <div className="scroll_taskdisplay">
          {allTaskLists}
        </div>
      </div >
    );

  }

}

export default TaskListsManager;