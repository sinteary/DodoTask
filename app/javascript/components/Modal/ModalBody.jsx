import React from 'react';

import { Button, Confirm } from "semantic-ui-react";

class ModalBody extends React.Component {
  render() {
    return (
      <div class="backdrop">
        <div class="modal">
          <div class="modal-content" className='popup\_inner'>
            <p>{this.props.modaltext}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" onClick={this.props.confirm}>Confirm</button>
            <button type="button" class="btn btb-secondary" onClick={this.props.cancel}>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ModalBody;