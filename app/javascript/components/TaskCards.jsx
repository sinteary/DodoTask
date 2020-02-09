import React from 'react';
import Axios from "axios";
import TaskCheckbox from "./Buttons/TaskCheckbox";
import { Card, Icon, Button, Label, Checkbox } from 'semantic-ui-react';
import { format, compareAsc } from 'date-fns'
import 'semantic-ui-css/semantic.css';

class TaskCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    }
  }

  componentDidMount() {
    this.setState({
      tasks: this.props.tasks
    })
  }

  render() {
    function getTags(tags) {
      if (tags.length > 0) {
        return (
          <Card.Content>
            {tags.map((tag, index) => (
              <Label color={"blue"} size={"small"} key={index} as='a'>
                {tag.name}
              </Label>))}
          </Card.Content>
        );
      }
    }

    function getDate(duedate) {
      if (duedate !== null) {
        return (
          <Card.Description>
            Due: {format(new Date(duedate), ('dd/MM/yyyy  hh:mm a'))}
          </Card.Description>
        );
      }
    }

    const allTasks = this.props.tasks.map(task => (
      <div key={task.id} className="taskcard">
        <Card>
          <Card.Content>
            <div>
              <TaskCheckbox
                style={{ float: "left" }}
                label={task.name}
                task_status={task.done}
                refresh={this.props.getTasks}
                task_id={task.id}
              />
              <Icon
                style={{ float: "right" }}
                link name="alternate pencil"
                color={this.props.editing && (this.props.taskid == task.id) ? "black" : "grey"}
                onClick={() => this.props.editTask(task.id)} />
            </div>
            <Card.Description>
              <p>{task.description}</p>
            </Card.Description>
            {getDate(task.duedate)}
          </Card.Content>
          {getTags(task.tags)}
        </Card>
      </div>
    ));

    return (
      allTasks
    );
  }

}

export default TaskCards;