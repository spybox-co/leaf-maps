import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="menu">
          <div className="group">
            {this.props.children}
          </div>
        </div>        
      </header>
    );
  }
}