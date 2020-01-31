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
    this.getTasks = this.getTasks.bind(this)
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    const url = "/api/v1/tasks/index";
    Axios.get(url, {
      params: {
        status: this.props.tasktype,
        sorting: this.props.sortcriteria
      }
    })
      .then(response => {
        console.log(response.data);
        this.setState({
          tasks: response.data,
          editing: false
        });
        console.log(this.state.tasks)
      })
      .catch(error => {
        console.log(error);
        // this.props.history.push("/tasks");
      });
  }

  // markTaskDone = (e, id) => {
  //   console.log("checked done for task")
  //   console.log(e.target.value)
  //   const url = `/api/v1/tasks/${id}`
  //   Axios.put(url,
  //     {
  //       data:
  //       {
  //         done: data.value,
  //         tags: []
  //       }
  //     })
  //     .then(response => {
  //       console.log(response.data)
  //       this.getTasks()
  //     })
  //     .catch(error => console.log(error))
  // }

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
        <Label color={"blue"} key={index} as='a'>
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

          {/* <div>
            <label
              className="task-label"
              htmlFor="checkid">
              <input
                type="checkbox"
                id="checkid"
                className="done-checkbox"
                onChange={(e) => this.markTaskDone(e, task.id)}
                checked={task.done} />
              {task.name}
            </label>
          </div> */}
        </Card.Content>
        <p>{task.description}</p>
        <p>{task.duedate == null ? "" :
          format(new Date(task.duedate), ('dd/MM/yyyy hh:mm a'))}</p>
        <div>{getTags(task.tags)}</div>
        <Button floated="right" icon="alternate trash" color="red" onClick={() => this.deleteTask(task.id)} />
        <Button floated="right" icon="alternate pencil" color={
          this.props.editing && (this.props.taskid == task.id) ? "black" : "grey"}
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
      <Card>
        <Card.Content>
          <Card.Header>Tasks</Card.Header>
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