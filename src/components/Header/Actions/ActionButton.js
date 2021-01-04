import React from 'react';

import Icon from '../../Icon';
import './ActionButton.scss';

const Button = props => {
  const { 
    // children,
    className,
    // label, 
    onClick,
    renderIcon,
    kind,
    hasLabel,
  } = props;

  const buttonKind = 
    (kind === 'primary' && 'spbx--header__action--primary') ||
    (kind === 'secondary' && 'spbx--header__action--secondary') ||
    (kind === 'tertiary' && 'spbx--header__action--tertiary') ||
    (kind === 'danger' && 'spbx--header__action--danger') ||
    (kind === 'warning' && 'spbx--header__action--warning') ||
    (kind === 'green' && 'spbx--header__action--green') ||
    (kind === 'orange' && 'spbx--header__action--orange') ||
    // To-Do
    (kind && `spbx--button--custom ${kind}`);

  

  const classes = [
    className ? className : null,
    'spbx--header__action',
    hasLabel && 'spbx--header__action-label',
    kind ? buttonKind : 'spbx--header__action--default',
  ].join(' ').trim();

  // To-Do:
  // Implement Icon Component
  // const Icon = renderIcon ? renderIcon : null;



  return (
      <button 
        className={classes}
        onClick={onClick}
      >
        {/* {children} */}

        {renderIcon && <RenderIconComponent icon={renderIcon} />}
      </button>
  );
  
}

export default Button;




const RenderIconComponent = ({ icon }) => {
  if (typeof icon === 'string') {
    return <Icon type={icon} size={20} />
  }
  if (typeof icon === 'function') {
    return icon;
  }
  return null;
}