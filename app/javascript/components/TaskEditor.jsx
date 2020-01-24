import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TagsBar from "./TagsBar"

class TaskEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      tags: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  //replace < and > characters with escaped value
  //so that we do not store raw HTML in database
  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  setBlankInput() {
    this.setState({
      name: "",
      description: ""
    })
  }

  onChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  //handles submission
  onSubmit() {
    const url = "/api/v1/tasks/create";
    const { name, description } = this.state;
    if (name.length == 0)
      return;

    //builds an object containing parameters required by task controller to create new task
    const body = {
      name,
      //replaces every new line character in instruction with a break tag to retain text format entered by user
      description: description.replace(/\n/g, "<br> <br>"),
      done: false
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
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
      .then((response) => {
        console.log(response);
        this.props.refresh();
        this.setBlankInput();
      })
      .catch(error => console.log(error.message));
  }

  onEdit() {
    console.log(this.props.taskid);
    const url = `/api/v1/tasks/${this.props.taskid}`
    Axios.put(url, {
      name: this.state.name,
      description: this.state.description
    })
      .then(response => {
        console.log(response.data);
        this.props.refresh();
        this.setBlankInput();
      })
      .catch(error => console.log(error));
  }

  componentDidUpdate(prevProps) {
    if (this.props.taskid !== prevProps.taskid) {
      console.log(this.props.taskid);
      if (this.props.editing == false) {
        this.setBlankInput()
      } else {
        const url = `/api/v1/show/${this.props.taskid}`
        Axios.get(url)
          .then(response => {
            console.log(response.data)
            this.setState({
              name: response.data.name,
              description: response.data.description
            })
          })
      }
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="task-editor" style={{ flex: 0.8, margin: '0 auto' }}>
            <h2 className="font-weight-normal mb-5">
              {this.props.editing ? "Editing task:" : "Add new task:"}
            </h2>
            <form>
              <div className="form-group">
                <label htmlFor="taskName">Task name</label>
                <input
                  type="text"
                  name="name"
                  id="taskName"
                  className="form-control"
                  required
                  value={this.state.name}
                  onChange={(data) => {
                    this.onChange(data);
                  }}
                  style={{ background: "rgba(255,255,255,0.5)" }}
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
                  value={this.state.description}
                  style={{ background: "rgba(255,255,255,0.5)" }}
                />
                <small id="descriptionHelp" className="form-text text-muted">
                  This field is optional.
                </small>
                <TagsBar
                  current_tags={this.state.tags}
                  editing={this.props.editing}
                ></TagsBar>
              </div>
              <button type="button" onClick={this.props.editing ? this.onEdit : this.onSubmit} className="btn custom-button">
                {this.props.editing ? "Save" : "Create"}
              </button>
              {this.props.editing ?
                <button type="button" onClick={this.props.disableEdit} className="btn custom-button">
                  Cancel
                </button>
                : null}
            </form>
          </div>
        </div>
      </div>
    );
  }

}

export default TaskEditor;