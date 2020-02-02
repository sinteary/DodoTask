import React from 'react';
import Axios from "axios";
import TaskCheckbox from "./Buttons/TaskCheckbox";
import { Card, Icon, Button, Label, Checkbox } from 'semantic-ui-react';
import { format, compareAsc } from 'date-fns'

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.getTasks = this.getTasks.bind(this);
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

  deleteTask = (id) => {
    console.log("delete triggered")
    const url = `/api/v1/tasks/${id}`;

    Axios.delete(url)
      .then(this.getTasks)
      .catch(error => console.log(error.message));
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
    const { tasks } = this.state;

    function getTags(tags) {
      return tags.map((tag, index) => (
        <Label color={"blue"} size={"small"} key={index} as='a'>
          {tag.name}
        </Label >
      ));
    }

    const allTasks = tasks.map(task => (
      <Card key={task.id}>
        <Card.Content>
          <TaskCheckbox
            label={task.name}
            task_status={task.done}
            refresh={this.getTasks}
            task_id={task.id}
          />
          <Card.Meta>
            <p>{task.description}</p>
          </Card.Meta>
        </Card.Content>
        <Card.Content>
          <div>{getTags(task.tags)}</div>
        </Card.Content>
        <p>{task.duedate == null ? "" :
          format(new Date(task.duedate), ('dd/MM/yyyy hh:mm a'))}</p>

        <Button floated="right" icon="alternate trash" color="red" onClick={() => this.deleteTask(task.id)} />
        <Button
          floated="right"
          icon="alternate pencil"
          color={this.props.editing && (this.props.taskid == task.id) ? "black" : "grey"}
          onClick={() => this.editTask(task.id)} />

      </Card>
    ));

    //If no tasks
    const noTask = (
      <div className="vw-100 vh-50 d-flex alighn-items-center justify-content-center">
        <h4>
          No tasks! You are a free bird. Go have some fun!
        </h4>
      </div>
    );

    return (
      <Card className="tasklist">
        <Card.Content>
          <Card.Header>{this.props.name}</Card.Header>
          <Button icon="plus" onClick={this.props.addTask}></Button>
        </Card.Content>
        <Card.Content>
          <div className="row">
            {this.state.tasks.length > 0 ? allTasks : noTask}
          </div>
        </Card.Content>
      </Card>
    );
  }

}

export default TaskList;