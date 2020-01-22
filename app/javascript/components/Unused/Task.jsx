import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
class Task extends React.Component {
  constructor(props) {
      super(props);
      //initialised a state object that holds state of recipe
      this.state = { task: {details: ""} };
      //method to make the state object accessible within component
      this.addHtmlEntities = this.addHtmlEntities.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
  }

  
  componentDidMount() {
    //accesses the id param from the "match" key of the props object
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    //make a HTTP request to fetch the task
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok!");
      })
      .then(response => this.setState({ task: response }))
      .catch(() => this.props.history.push("/tasks"));
  }

  //takes a string that replaces all escaped opening/closing
  //brackets with HTML entities
  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }


  deleteTask() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    Axios.delete(url,
      {headers: {
        "X-CSRF-Token": token,
          "Content-Type": "application/json"
      }},)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok!");
        })
        .then(() => this.props.history.push("/tasks"))
        .catch(error => console.log(error.message));
  }



  //render: gets task from state, renders it on the page
  render() {
    const { task } = this.state;
    //let subtaskList = "No subtasks";

    /* splits comma-separated subtaasks into an array mapped over it
    if (task.subtasks.length > 0) {
      subtaskList = task.subtasks;
        .split(",")
        .map((subtask, index) => (
          <li key={index} className="list-group-item">
            {subtask}
          </li>
        ))
    }
    */
    
    const description = this.addHtmlEntities(task.description);
    
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          {/*
          <img
            src={task.image}
            alt={`${recipe.name} image`}
            classBame="img-fluid position-absolute"
          />
          */}
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {task.name}
          </h1>
        </div>
        
        <div className="container py-5">
          <div className="row">
            {/* subtasks list:
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Subtasks</h5>
                {subtaskList}
              </ul>
            </div>
            */}

            {/*Task description*/}
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Task Description</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${description}`
                }}
                />
            </div>

            {/*Delete task button*/}
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger" onClick={this.deleteTask}>
                Delete Task
              </button>
            </div>
          </div>

          <Link to="/tasks" className="btn btn-link">
            Back to tasks
          </Link>
        </div>
      </div>
    );
  }

}

export default Task;