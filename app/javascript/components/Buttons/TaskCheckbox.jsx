import React, { Component } from 'react'
import { Checkbox } from 'semantic-ui-react'
import Axios from 'axios'

class TaskCheckbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.task_status
    };
  }

  toggleTaskDone = () => {
    const url = `/api/v1/tasks/${this.props.task_id}`
    Axios.put(url, {
      done: !this.state.checked
    })
      .then(response => {
        console.log("MARK TASK " + this.props.task_id + " ", response.data);
        this.props.refresh();
        this.setState({
          checked: response.data.done
        })
      })
      .catch(error => console.log(error));

  }

  render() {
    return (
      <div>
        <Checkbox
          label={this.props.label}
          onChange={this.toggleTaskDone}
          checked={this.state.checked}
        />
      </div>
    )
  }
}

export default TaskCheckbox;
