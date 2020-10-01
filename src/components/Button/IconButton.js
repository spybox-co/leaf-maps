import React from 'react';
import Button from './Button';

const IconButton = props => {
    const {...other} = props
    return (
      <Button
        hasOnlyIcon
        {...other}
      />
    );
}

export default IconButton;