import React from "react";
import { Link } from "react-router-dom";
import { Checkbox, Label } from "semantic-ui-react";
import Axios from "axios";

class Tasks extends React.Component {
  constructor(props) {
    //initialising a state object that holds state of tasks
    //on initialisation: empty array
    super(props);
    this.state = {
      tasks: []
    };
  }

  getTasks() {
    const url = "/api/v1/tasks/index";
    //make a HTTP call to fetch all tasks using the Fetch API
    Axios.get(url)
      .then(response => {
        console.log(response.data);
        this.setState({ tasks: response.data });
        console.log(tasks);
      })
        //if error: redirect to homepage
        .catch(() => this.props.history.push("/tasks"));
  }

  markTaskDone = (e, id) => {
    console.log("checked done for task ${id}")
    const url = `/api/v1/tasks/${id}`
    Axios.put( url, {done: e.target.checked} )
    .then(response => {
      console.log(response.data)
      this.getTasks()
    })
    .catch(error => console.log(error))
  }

  deleteTask = (id) => {
    console.log("delete triggered")
    const url = `/api/v1/tasks/${id}`;
    //const token = document.querySelector('meta[name="csrf-token"]').content;

    Axios.delete(url /*, {
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json"
        }
      }*/)    
        .then(response => {
          this.getTasks()
        })
        //.then(() => this.props.history.push("/tasks"))
        .catch(error => console.log(error.message));
  }


  //React lifecycle method: called immediately after component is mounted
  componentDidMount() {
    this.getTasks();
  }

  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map( task => (
      <div key={task.id} className="col-md-6 cos-lg-4">
        <div className="card mb-4">
          <div className="card-body">
            <div>
              <div class="task-checkbox">
                <input type="checkbox" class="done-checkbox"
                  onChange={(e) => this.markTaskDone(e, task.id)}
                  checked={task.done}/>
                <label class = "task-label" for="checkbox">{task.name}</label>
              </div>
              <p>{task.description}</p>
              <button type="button" className="btn custom-button" onClick={ () => this.editTask}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" onClick={ () => 
                this.deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ));

    //If no tasks
    const noTask = (
      <div className="vw-100 vh-50 d-flex alighn-items-center justify-content-center">
        <h4>
          No tasks yet. Why not <Link to="/new_task">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        {/* <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All tasks here</h1>
            <p className="lead text-muted">Here are all the tasks that you have added:</p>
          </div>
        </section> */}
      
        <div className="py-5">
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/task" className="btn custom-button">
                Add a new task
              </Link>
            </div>
            <div className="row">
              {tasks.length > 0 ? allTasks : noTask}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );

  }

}

export default Tasks;