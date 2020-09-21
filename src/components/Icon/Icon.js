import React from "react";

import { 
  Add32,
  ArrowUp32,
  Copy32, 
  DocumentBlank32,
  DocumentPdf32, 
  Download32, 
  Launch32,
  Menu32,
  View32,
  Send32
} from '@carbon/icons-react';

import {
  LogoBehance,
  LogoGitHub,
  LogoInstagram,
  LogoLinkedIn,
  GlyphStar,
} from './OtherIcons';

import { tidy } from "utils/lib";


import './Icon.scss';

// @Info: Dynamic Component name in React
// @See:  https://dev.to/arpit016/dynamic-components-in-react-4iic
const Components = {
  default: DocumentBlank32,
  Add: Add32,
  ArrowUp: ArrowUp32,
  Copy: Copy32,
  DocumentBlank: DocumentBlank32,
  DocumentPdf: DocumentPdf32,
  Download: Download32,
  GlyphStar: GlyphStar,
  Launch: Launch32,
  LogoLinkedIn: LogoLinkedIn,
  LogoBehance: LogoBehance,
  LogoGitHub: LogoGitHub,
  LogoInstagram: LogoInstagram,
  Menu: Menu32,
  Send: Send32,
  View: View32,
};

const IconComponent = ({ type }) => {
  return React.createElement(Components[type]);
}


const Icon = ({ type, size, className, ...others }) => {
  const classes = ["Icon", className ? className : "", size ? size : ""].join(' ');
  return (
    <div className={classes} {...others}>
      <IconComponent type={type ? type : "default"} />   
    </div>
  );
};

export default Icon;




