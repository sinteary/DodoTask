import React from 'react';
import Axios from "axios";
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import moment from "moment";

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
        done: this.props.condition
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
        this.props.history.push("/tasks");
      });
  }

  markTaskDone = (e, id) => {
    console.log("checked done for task ${id}")
    const url = `/api/v1/tasks/${id}`
    Axios.put(url, { done: e.target.checked })
      .then(response => {
        console.log(response.data)
        this.getTasks()
      })
      .catch(error => console.log(error))
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

  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map(task => (
      <Card key={task.id}>
        <div>
          <div className="task-checkbox">
            <input type="checkbox" className="done-checkbox"
              onChange={(e) => this.markTaskDone(e, task.id)}
              checked={task.done} />
            <label className="task-label">{task.name}</label>
          </div>
          <p>{task.description}</p>
          <p>{task.duedate == null ? "" :
            moment(task.duedate).format('DD/MM/YYYY HH:mm a')}</p>
          <Button floated="right" icon="alternate trash" color="red" onClick={() => this.deleteTask(task.id)} />
          <Button floated="right" icon="alternate pencil" color={
            this.props.editing && (this.props.taskid == task.id) ? "black" : "grey"}
            onClick={() => this.editTask(task.id)} />
        </div>
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