import React from 'react';

import { 
  // Add32,
  ArrowUp32,
  Close32,
  Copy32, 
  DocumentBlank32,
  DocumentPdf32, 
  Download32,
  Fade32, 
  Launch32,
  Menu32,
  View32,
  Search32,
  Send32
} from '@carbon/icons-react';

import {
  LogoBehance,
  LogoGitHub,
  LogoInstagram,
  LogoLinkedIn,
  GlyphStar,
} from './OtherIcons';

import { 
  Add,
  LayerStack, 
  Locate,
  Map,
  Substract
} from './Library';

import { cn } from '../../utils/helpers';



import './Icon.scss';

// @Info: Dynamic Component name in React
// @See:  https://dev.to/arpit016/dynamic-components-in-react-4iic
const Components = {
  default: Fade32,
  // Add: Add32,
  Add: Add,
  ArrowUp: ArrowUp32,
  Close: Close32,
  Copy: Copy32,
  DocumentBlank: DocumentBlank32,
  DocumentPdf: DocumentPdf32,
  Download: Download32,
  Fade: Fade32,
  GlyphStar: GlyphStar,
  Launch: Launch32,
  LayerStack: LayerStack,
  Locate: Locate,
  LogoLinkedIn: LogoLinkedIn,
  LogoBehance: LogoBehance,
  LogoGitHub: LogoGitHub,
  LogoInstagram: LogoInstagram,
  Map: Map,
  Menu: Menu32,
  Search: Search32,
  Send: Send32,
  Substract: Substract,
  View: View32,
};

const IconComponent = ({ type }) => {
  return React.createElement(Components[type]);
}


const Icon = ({ type, size, className, ...others }) => {
  const classes = cn('Icon', className && className, size ? `Icon-${size}` : 'Icon-16');
  return (
    <div className={classes} {...others}>
      <IconComponent type={type ? type : "default"} />   
    </div>
  );
};

export default Icon;




