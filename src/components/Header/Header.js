import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className="menu">
          {this.props.children}
        </div>        
      </header>
    );
  }
}