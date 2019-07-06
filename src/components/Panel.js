import React, { Component } from 'react';

export default class Panel extends Component {
  render() {
    return (
      <div style={{ display: `table`, position: `absolute`, width: `100%`, background: `none`, zIndex: 200 }}>
        {this.props.children}
      </div>
    );
  }
}