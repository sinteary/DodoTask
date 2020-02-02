import React from "react";
import TaskList from "./TaskList";
import { Grid, Button, Icon, Modal, Form } from 'semantic-ui-react';
import Axios from "axios";

class AllTaskLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: [],
      new_tasklist_name: "",
      number_of_lists: 1
    }
    this.onChange = this.onChange.bind(this);
    this.createTaskList = this.createTaskList.bind(this);
    this.getTaskLists = this.getTaskLists.bind(this)
  }

  createTaskList() {
    const url = "/tasklists";
    Axios.post(url, {
      name: this.state.new_tasklist_name
    })
      .then(response => {
        console.log(response);
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
          number_of_lists: response.data.length
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

  render() {
    const allTaskLists = this.state.tasklists.map(tasklist => (
      <TaskList key={tasklist.id}
        name={tasklist.name}
        addTask={() => this.props.addTask(tasklist.id)}
        tasklist_id={tasklist.id}
        editTask={this.editTask}
        toggleRefresh={this.props.toggleRefresh}
        shouldRefresh={this.props.shouldRefresh}
      >
      </TaskList>
    ));

    return (
      <div>
        <Modal size="small" trigger={<Button icon="plus"></Button>}>
          <Modal.Header>Create a new tasklist</Modal.Header>
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
                  onChange={this.onChange}
                />
              </Form.Field>
            </Form>
            <p>Click anywhere outside this popup to cancel</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' onClick={this.createTaskList}>
              Create
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

export default AllTaskLists;