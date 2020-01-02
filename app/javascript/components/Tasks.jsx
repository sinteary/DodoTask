import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "semantic-ui-react";
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
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok!")
      })
      //if response successful: application saves array of tasks to task state
      .then(response => this.setState({ tasks: response }))
      //if error: redirect to homepage
      .catch(() => this.props.history.push("/"));
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

  //React lifecycle method: called immediately after component is mounted
  componentDidMount() {
     this.getTasks();
  }

  render() {
    const { tasks } = this.state;
    const allTasks = tasks.map((task, index) => (
      <div key={index} className="col-md-6 cos-lg-4">
        <div className="card mb-4">
          <div className="card-body">
              <h5 className="card-title">{task.name}</h5>
              <p>{task.description}</p>
              <div>
                <input className="done-checkbox" type="checkbox"
                  onChange={
                    (e) => this.markTaskDone(e, task.id)}
                    checked={task.done}/>
                <label>Done</label>
              </div>
              <button type="button" className="btn custom-button" onClick={this.editTask}>
                Edit
              </button>
              <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                Delete
              </button>
              {/*<Link to={`/task/${task.id}`} className="btn custom-button"> View Task </Link*/}
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
        <section className="jumbotron jumbotron-fluid text-center">
          <div className="container py-5">
            <h1 className="display-4">All tasks</h1>
            <p className="lead text-muted">Here are all the tasks that you have added:</p>
          </div>
        </section>
      
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