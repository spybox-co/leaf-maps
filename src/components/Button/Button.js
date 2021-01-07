import React from 'react';

import Icon from '../Icon';
import './styles.scss';

const Button = props => {
  const { 
    children,
    className,
    // label, 
    onClick,
    renderIcon,
    kind,
    hasOnlyIcon,
  } = props;

  const buttonKind = 
    (kind === 'primary' && 'spbx--button--primary') ||
    (kind === 'secondary' && 'spbx--button--secondary') ||
    (kind === 'tertiary' && 'spbx--button--tertiary') ||
    (kind === 'danger' && 'spbx--button--danger') ||
    (kind === 'warning' && 'spbx--button--warning') ||
    (kind === 'green' && 'spbx--button--green') ||
    (kind === 'orange' && 'spbx--button--orange') ||
    // To-Do
    (kind && `spbx--button--custom ${kind}`);

  

  const classes = [
    className ? className : null,
    'spbx--button',
    hasOnlyIcon && 'spbx--button--icon-only',
    kind ? buttonKind : 'spbx--button--default',
    
  ].join(' ').trim();

  // To-Do:
  // Implement Icon Component
  // const Icon = renderIcon ? renderIcon : null;



  return (
      <button 
        className={classes}
        onClick={onClick}
      >
        {children}
        {/* {renderIcon && <RenderIconComponent icon={renderIcon} />} */}
        {renderIcon && RenderIconComponent(renderIcon)}
      </button>
  );
  
}

export default Button;




const RenderIconComponent = (icon) => {

  // console.log("Icon type:", icon, typeof icon);
  
  if (typeof icon === 'string') {
    return <Icon type={icon} />
  }
  if (typeof icon === 'function') {
    return icon;
  }
  return null;
}