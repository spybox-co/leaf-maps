import React from 'react';
// import { IconButton } from "../../Button";

import Icon from '../../Icon';

import './styles.scss';
import './TabButton.scss';

const TabButton = props => {
  const { 
    children,
    className,
    // label, 
    onClick,
    renderIcon,
    // kind,
    active,
    hasLabel,
  } = props;

  const classes = [
    className ? className : null,
    'spbx--TabButton',
    hasLabel && 'spbx--TabButton-label',
    // kind ? buttonKind : 'spbx--header__action--default',
    active ? "active" : "inactive"
  ].join(' ').trim();



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
export default TabButton;



const RenderIconComponent = ({ icon }) => {
  if (typeof icon === 'string') {
    return <Icon type={icon} size={20} />
  } else {
    console.error("Type of 'renderIcon' argument should be a 'string' only in <ActionButton />!")
  }
  return null;
}



/*
  <IconButton
    kind={props.active ? "active" : "inactive"}
    disabled={false}
    onClick={props.onClick}
    renderIcon={props.icon}
    iconDescription="Tab icon"
  />
*/