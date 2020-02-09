import React, { Component } from 'react';
import axios from 'axios'
import { Form, Grid, Divider, Header, Segment, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.css';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, password_confirmation } = this.state
    let user = {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    axios.post('/users', { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          console.log("successful creation")
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/')
  }

  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}</ul>
      </div>
    )
  }

  render() {
    const { email, password, password_confirmation } = this.state
    return (
      <div>
        <div className="signup-form">
          <Header as='h1'>Create a new Account</Header>
          <Segment placeholder>
            <Grid columns={1} relaxed='very' stackable>
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
                  <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label='Password'
                    type='password'
                    value={password_confirmation}
                    name="password_confirmation"
                    onChange={this.handleChange}
                  />
                  <Button content='Sign up!' primary onClick={this.handleSubmit} />
                </Form>
              </Grid.Column>
            </Grid>
          </Segment>
        </div>
      </div>
    );
  }
}
export default Signup;