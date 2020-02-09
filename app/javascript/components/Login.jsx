import React, { Component } from 'react';
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment, Header } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.css';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  redirect = () => {
    this.props.history.push('/tasks')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map(error => {
            return <li key={error}>{error}</li>
          })
          }
        </ul>
      </div>
    )
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    let user = {
      email: email,
      password: password
    }

    axios.post('/login', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirectToSignup = () => {
    console.log("redirect to signup");
    this.props.history.push('/signup')
  }

  render() {
    const { email, password } = this.state
    return (
      <div>
        <div className="login-signup">
          <Header as='h1'>Task Manager</Header>
          <Segment placeholder>
            <Grid columns={2} relaxed='very' stackable>
              <Grid.Column>
                <Form>
                  {/* <Form.Input
                    icon='user'
                    iconPosition='left'
                    label='Username'
                    placeholder='Username'
                    value={username}
                    name="username"
                    onChange={this.handleChange}
                  /> */}
                  <Form.Input
                    icon='mail'
                    iconPosition='left'
                    label='Email'
                    placeholder='Email'
                    value={email}
                    name="email"
                    onChange={this.handleChange}
                  />

                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    value={password}
                    name="password"
                    onChange={this.handleChange}
                  />

                  <Button content='Login' primary onClick={this.handleSubmit} />
                </Form>
              </Grid.Column>

              <Grid.Column verticalAlign='middle'>
                <Button content='Sign up' icon='signup' size='big' onClick={this.redirectToSignup} />
              </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
          </Segment>
          <div>
            {
              this.state.errors ? this.handleErrors() : null
            }
          </div>

        </div >
      </div>
    );
  }
}
export default Login;