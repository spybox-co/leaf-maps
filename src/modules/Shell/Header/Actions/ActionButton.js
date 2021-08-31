import React from 'react';

import Icon from '../../../../components/Icon';
import './ActionButton.scss';

const Button = props => {
  const { 
    children,
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

  if (renderIcon && children) {
    console.error("Not allowed arguments 'renderIcon' and react children in <ActionButton /> at the same time. Choose one option.")
  }

  return (
      <button 
        className={classes}
        onClick={onClick}
      >
        {!renderIcon && children ? children : null}

        {renderIcon && !children && (<RenderIconComponent icon={renderIcon} />)}
      </button>
  );
  
}

export default Button;




const RenderIconComponent = ({ icon }) => {
  if (typeof icon === 'string') {
    return <Icon type={icon} size={20} />
  } else {
    console.error("Type of 'renderIcon' argument should be a 'string' only in <ActionButton />!")
  }
  // if (typeof icon === 'function') {
  //   return icon;
  // }
  return null;
}