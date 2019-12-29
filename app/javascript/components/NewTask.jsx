import React from "react";
import { Link } from "react-router-dom";

class NewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //initialise empty fields
      name: "",
      description: "",
      done: false
      //subtasks: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  //replace < and > characters with escaped value
  //so that we do not store raw HTML in database
  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /*handles editing
  use ES6 computed property names to set value of every user input to
  corresponding key in state
  */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //handles submission
  onSubmit(event) {
    event.preventDefault();
    const url = "/api/v1/tasks/create";
    const { name, description, done } = this.state;

    if (name.length == 0)
      return;

    /*
    builds an object containing parameters required by task controller to create new task
    */
    const body = {
      name,
      //replaces every new line character in instruction with a break tag to retain text format entered by user
      description: description.replace(/\n/g, "<br> <br>")
    };

    const token= document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        //protect against Cross-Site Request Forgery attacks
        //attaches the token to the HTML document
        //required whenever a non-GET request is made
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      //if task successfully created: redirect user to task page to view
      .then(response => this.props.history.push(`/task/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new task to the list
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="taskName">Task name</label>
                <input
                  type="text"
                  name="name"
                  id="taskName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskDescription">Task description </label>
                <textarea
                  type="text"
                  name="description"
                  rows="3"
                  id="taskDescription"
                  className="form-control"
                  onChange={this.onChange}
                />
                <small id="descriptionHelp" className="form-text text-muted">
                  This field is optional.
                </small>
              </div>
              <button type="submit" className="btn custom-button mt-3">
                Create Task
              </button>
              <Link to="/tasks" className="btn btn-link mt-3">
                Back to tasks
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default NewTask;