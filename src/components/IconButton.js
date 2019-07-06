import React, { Component } from 'react';
import { Button } from 'carbon-components-react';

class IconButton extends Component {
  render() {
    const {...other} = this.props
    return (
      <Button 
        className="bx--btn--icon-only"
        {...other}
      />
    );
  }
}

export default IconButton;