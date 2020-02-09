import React from 'react';

class TopBar extends React.Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
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