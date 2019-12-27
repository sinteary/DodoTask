import React from 'react';
import { ModalBody } from './ModalBody';
import { Button, Confirm } from "semantic-ui-react";

class ModalButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow() {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div className="col-sm-12 col-lg-2">
        <button type="button" className="btn btn-danger"
          onClick={this.toggleShow.bind(this)}>
          {this.props.text}
        </button>
        {this.state.show ?
          <ModalBody
            modaltext={this.props.text}
            confirm={this.props.confirm}
            cancel={this.toggleShow.bind(this)}
          />
          : null
        }
      </div>
    )
  }
}

export default ModalButton;