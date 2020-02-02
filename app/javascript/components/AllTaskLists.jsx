import React from "react";
import TaskList from "./TaskList";
import { Grid, Button, Icon, Modal, Form } from 'semantic-ui-react';
import Axios from "axios";

class AllTaskLists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasklists: [],
      new_tasklist_name: ""
    }
    this.onChange = this.onChange.bind(this);
    this.createTaskList = this.createTaskList.bind(this);
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
          tasklists: response.data
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
      <Grid.Column key={tasklist.id} width={6}>
        {/* <p>{tasklist.name}</p> */}
        <TaskList
          name={tasklist.name}
          addTask={() => this.props.addTask(tasklist.id)}
          tasklist_id={tasklist.id}
          tasks={tasklist.tasks}
        // tasks={tasklist.tasks}
        >
        </TaskList>
      </Grid.Column>
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
        <Grid>
          {allTaskLists}
          {/* <TaskList
            tasktype=""
            condition={false}
            editTask={this.editTask}
            toggleRefresh={this.props.toggleRefresh}
            shouldRefresh={this.props.shouldRefresh}
          ></TaskList> */}
        </Grid>
      </div >
    );

  }

}

export default AllTaskLists;