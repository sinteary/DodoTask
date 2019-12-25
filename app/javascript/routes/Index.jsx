import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import Task from "../components/Task";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tasks" exact component={Tasks} />
      <Route path="/task/:id" exact component={Task} />
    </Switch>
  </Router>
);