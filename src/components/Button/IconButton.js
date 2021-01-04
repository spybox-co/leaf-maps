import React from 'react';
import Button from './Button';

// import Icon from '../Icon';

const IconButton = props => {
    const { 
       renderIcon,
       ...other 
    } = props

    return (
      <Button
        hasOnlyIcon
        renderIcon={renderIcon}
        {...other}
      />
    );
}

export default IconButton;