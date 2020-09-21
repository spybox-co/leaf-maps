import React from 'react';

import Icon from './Icon';

const Button = props => {

    const { 
      children,
      label, 
      onClick,
      renderIcon,
      kind,
      hasOnlyIcon 
    } = props;

    const buttonKind = 
      kind === 'primary' && 'spbx--button--primary' ||
      kind === 'secondary' && 'spbx--button--secondary' ||
      kind === 'tertiary' && 'spbx--button--tertiary' ||
      kind === 'danger' && 'spbx--button--danger';

    

    const classes = [
      'spbx--button',
      hasOnlyIcon && 'spbx--button--icon-only',
      kind ? buttonKind : 'spbx--button--default'
    ].join(' ');

    const Icon = renderIcon ? renderIcon : null;

    return (
      <button 
        className={classes}
        onClick={onClick}
      >
          {children}
          {renderIcon && <Icon />}
        </button>
    );
  
}

export default Button;