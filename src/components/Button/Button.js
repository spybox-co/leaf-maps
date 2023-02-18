import React from 'react';

import Icon from '../Icon';
import './Button.scss';

const Button = props => {
  const { 
    children,
    className,
    // label, 
    onClick,
    renderIcon,
    kind,
    hasOnlyIcon,
    anchor,
    disabled,
    iconDescription,
    size,
    ...other
  } = props;


  // sm,
  // md,
  // lg,

  const buttonKind = 
    (kind === 'primary' && 'fbr--button--primary') ||
    (kind === 'secondary' && 'fbr--button--secondary') ||
    (kind === 'tertiary' && 'fbr--button--tertiary') ||
    (kind === 'ghost' && 'fbr--button--ghost') ||
    (kind === 'danger' && 'fbr--button--danger') ||
    (kind === 'warning' && 'fbr--button--warning') ||
    (kind === 'green' && 'fbr--button--green') ||
    (kind === 'orange' && 'fbr--button--orange') ||
    // To-Do
    (kind && `fbr--button--custom ${kind}`);

  const buttonSize = 
    (size === 'small' && 'fbr--button--sm') ||
    (size === 'medium' && 'fbr--button--md') ||
    (size === 'large' && 'fbr--button--lg');

  const classes = [
    className ? className : null,
    'fbr--button',
    hasOnlyIcon && 'fbr--button--icon-only',
    kind ? buttonKind : 'fbr--button--default',
    disabled && 'fbr--button--disabled',
    buttonSize || 'fbr--button-lg'
    
  ].join(' ').trim();

  // To-Do:
  // Implement Icon Component
  // const Icon = renderIcon ? renderIcon : null;

  const Component = anchor ? "a" : "button";

  return (
      <Component
        className={classes}
        onClick={onClick}
        disabled={disabled}
        {...other}
      >
        {children}
        {/* {renderIcon && <RenderIconComponent icon={renderIcon} />} */}
        {renderIcon && RenderIconComponent(renderIcon)}
      </Component>
  );
  
}

export default Button;




const RenderIconComponent = (icon) => {

  // console.log("Icon type:", icon, typeof icon);
  
  if (typeof icon === 'string') {
    return <Icon className="fbr--button__icon" type={icon} />
  }
  if (typeof icon === 'function') {
    return icon;
  }
  return null;
}