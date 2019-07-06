import React, { Component } from 'react';

class Menu extends Component {
  render() {
    return (
      <div style={{ display: `table`, position: `absolute`, width: `100%`, background: `none`, top: 48, zIndex: 200 }}>
        {this.props.children}
      </div>
    );
  }
}

export default Menu;