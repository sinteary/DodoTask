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
  }

  createTaskList() {
    const url = "/tasklists";
    Axios.post(url, {

    })
      .then(response => {
        console.log(response);
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
      <Grid.Column>
        <TaskList
          name={tasklist.name}
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
          </Modal.Content>
          <Modal.Actions>
            <Button>
              Cancel
            </Button>
            <Button color='green'>
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