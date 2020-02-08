import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class TopBar extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     search_tags: []
  //   };

  // }

  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })


  render() {
    const { activeItem } = this.state

    return (
      <div className="ui menu">
        <a className="item" onClick={this.props.disableSearch}>Home</a>
        <a className="item" onClick={this.props.toggleSearch}>Search</a>
        <a className="item">Calendar (Coming soon!)</a>
        <a className="item">Dashboard (Coming soon!)</a>
      </div>
    )

  }

}

export default TopBar;