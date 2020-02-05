import React from "react";
import { Link } from 'react-router-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Axios from "axios";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Task Manager</h1>
        <p className="lead">
          Manage all your tasks in a simple and efficient way.
        </p>
        <hr className="my-4" />
        <div>
          <Link to='/login'>Log In</Link>
          <br></br>
          <Link to='/signup'>Sign Up</Link>
        </div>
      </div>
    </div>
  </div>
);