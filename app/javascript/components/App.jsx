import React from "react";
import Routes from "../routes/Index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Axios from "axios";
import TaskPage from "./Tasks";

// export default props => <>{Routes}</>;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
    };
  }

  componentDidMount() {
    this.loginStatus();
  }

  loginStatus = () => {
    const url = 'logged_in'
    Axios.get(url, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.handleLogin(response)
        } else {
          this.handleLogout()
        }
      })
      .catch(error => {
        console.log("ERROR:", error)
      })
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            {/* <Route
              exact path='/'
              render={props => (
                <Home {...props} loggedInStatus={this.state.isLoggedIn} />)} /> */}
            <Route
              exact path='/'
              render={props => (
                <Login {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn} />
              )} />
            <Route
              exact path='/signup'
              render={props => (
                <Signup {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn} />)}
            />
            <Route
              exact path='/tasks'
              render={props => (
                <TaskPage {...props}
                  {...console.log(this.state.user)}
                  user_id={this.state.user.id}
                />
              )}

            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;