import React, { Component } from 'react';
import Button from './Button';
// import { Button } from 'carbon-components-react';

class IconButton extends Component {
  render() {
    const {...other} = this.props
    return (
      <Button 
        // className="bx--btn--icon-only"
        // className="spbx--button--icon-only"
        hasOnlyIcon
        {...other}
      />
    );
  }
}

export default IconButton;