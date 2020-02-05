import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/Home";
import Tasks from "../components/Tasks";

class Index extends React.Component {
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
    const url = 'http://localhost:3000/logged_in'
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
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Tasks} />
            <Route exact path='/signup' component={Tasks} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Home;


// export default (
//   <Router>
//     <Switch>
//       <Route path="/" exact component={Home} />
//       <Route path="/tasks" exact component={Tasks} />
//       {/* <Route path="/task/:id" exact component={Task} /> */}
//     </Switch>
//   </Router>
// );