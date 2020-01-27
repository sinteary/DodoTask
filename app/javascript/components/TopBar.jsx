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
        <a className="item">Editorials</a>
        <a className="item">Reviews</a>
        <a className="item">Upcoming Events</a>
      </div>
    )

  }

}

export default TopBar;