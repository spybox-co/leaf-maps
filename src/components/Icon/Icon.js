import React from 'react';

import { 
  // Add32,
  ArrowUp32,
  ArrowRight32,
  CheckmarkFilled32,
  CheckmarkOutline32,
  Close32,
  Copy32, 
  DocumentBlank32,
  DocumentPdf32, 
  Download32,
  Fade32, 
  Information32,
  InformationFilled32,
  Launch32,
  Menu32,
  RadioButton32,
  RadioButtonChecked32,
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
  Change,
  LayerStack, 
  Locate,
  Map,
  Printer,
  Settings,
  Substract
} from './Library';

import { cn } from '../../utils/helpers';



import './Icon.scss';

// @Info: Dynamic Component name in React
// @See:  https://dev.to/arpit016/dynamic-components-in-react-4iic
const Components = {
  default: DocumentBlank32,
  Default: DocumentBlank32,
  // Add: Add32,
  Add: Add,
  ArrowUp: ArrowUp32,
  ArrowRight: ArrowRight32,
  Close: Close32,
  Change: Change,
  CheckmarkFilled: CheckmarkFilled32,
  CheckmarkOutline: CheckmarkOutline32,
  Copy: Copy32,
  DocumentBlank: DocumentBlank32,
  DocumentPdf: DocumentPdf32,
  Download: Download32,
  Fade: Fade32,
  GlyphStar: GlyphStar,
  Information: Information32,
  InformationFilled: InformationFilled32,
  Launch: Launch32,
  LayerStack: LayerStack,
  Locate: Locate,
  LogoLinkedIn: LogoLinkedIn,
  LogoBehance: LogoBehance,
  LogoGitHub: LogoGitHub,
  LogoInstagram: LogoInstagram,
  Map: Map,
  Menu: Menu32,
  Printer: Printer,
  RadioButton: RadioButton32,
  RadioButtonChecked: RadioButtonChecked32,
  Search: Search32,
  Send: Send32,
  Settings: Settings,
  Substract: Substract,
  View: View32,
};

const IconComponent = ({ type }) => {
  return React.createElement(Components[type]);
}


const Icon = ({ type, size, className, ...others }) => {
  const classes = cn(className && className, 'Icon', size ? `Icon-${size}` : 'Icon-16');
  return (
    <div className={classes} {...others}>
      <IconComponent type={type ? type : "default"} />   
    </div>
  );
};

export default Icon;




