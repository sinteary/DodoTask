import React from 'react';
import Axios from "axios";
import TaskCards from "../../Common/TaskCards"
import { Card, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.getTasks = this.getTasks.bind(this);
    this.toggleEditTask = this.toggleEditTask.bind(this);
  }

  componentDidMount() {
    this.getTasks();
  }

  //Fetches the tasks for a tasklist
  getTasks = () => {
    const url = `/tasklists/${this.props.tasklist_id}`;
    Axios.get(url)
      .then(response => {
        console.log("RETRIEVED TASKS:", response.data);
        this.setState({
          tasks: response.data.tasks,
        });
      })
      .catch(error => {
        console.log("ERROR RETRIEVING TASKS:", error);
      });
  }

  //Toggles editing of task
  toggleEditTask = (id) => {
    if (id != this.props.taskid) {
      this.props.editTask(id);
    }
    else {
      this.props.disableEdit()
    }
  }

  componentDidUpdate(prevProps) {
    //Checks if the tasklist needs to be refreshed to reflect new information
    if (this.props.shouldRefresh !== prevProps.shouldRefresh) {
      if (this.props.shouldRefresh == true) {
        this.getTasks();
        this.props.toggleRefresh();
      }
    }
  }

  render() {
    //Display message showing no tasks
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
          <Button
            size="tiny"
            style={{ float: "right" }}
            icon="plus"
            onClick={this.props.addTask} />
          <Button
            size="tiny"
            style={{ float: "right" }}
            icon="alternate pencil"
            onClick={() => { this.props.toggleEditTasklist(this.props.tasklist_id) }} />
        </Card.Content>
        <Card.Content className="main-list">
          <div className="row">
            {this.state.tasks.length > 0 ?
              <TaskCards
                tasks={this.state.tasks}
                editTask={this.toggleEditTask}
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