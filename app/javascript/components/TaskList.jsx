import React from 'react';
import Axios from "axios";
import TaskCheckbox from "./Buttons/TaskCheckbox";
import { Card, Icon, Button, Label, Checkbox } from 'semantic-ui-react';
import { format, compareAsc } from 'date-fns'
import 'semantic-ui-css/semantic.css';
import TaskCards from "./TaskCards"


class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.getTasks = this.getTasks.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    const url = `/tasklists/${this.props.tasklist_id}`;
    Axios.get(url)
      .then(response => {
        console.log(response.data);
        this.setState({
          tasks: response.data.tasks,
          editing: false
        });
        console.log(this.state.tasks)
      })
      .catch(error => {
        console.log(error);
      });
  }

  editTask = (id) => {
    //if current task being edited is different than prev
    if (id != this.props.taskid) {
      this.props.editTask(id);
    }
    else {
      this.props.disableEdit()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldRefresh !== prevProps.shouldRefresh) {
      if (this.props.shouldRefresh == true) {
        this.getTasks();
        this.props.toggleRefresh();
      }
    }
  }

  render() {
    //If no tasks
    const noTask = (
      <div>
        <h4>
          No tasks. Go have some fun!
        </h4>
      </div>
    );


    return (
      <Card className="tasklist">
        <Card.Content>
          <Card.Header style={{ float: "left" }}>{this.props.name}</Card.Header>
          <Button size="tiny" style={{ float: "right" }} icon="plus" onClick={this.props.addTask} />
          <Button size="tiny" style={{ float: "right" }} icon="alternate pencil" onClick={() => { this.props.toggleEditTasklist(this.props.tasklist_id) }} />
        </Card.Content>
        <Card.Content className="main-list">
          <div className="row">
            {this.state.tasks.length > 0 ?
              <TaskCards
                tasks={this.state.tasks}
                editTask={this.editTask}
                getTasks={this.getTasks}
              />
              : noTask}
          </div>
        </Card.Content>
      </Card>
    );
  }

}

export default TaskList;