import React, { Component } from 'react';
import Typo from '../Typography';

import './UILink.css'

export default class Link extends Component {
  render() {
    const { label, title, option, ...other } = this.props;
    return (
      <a className="target-link" {...other}>
        <span className="target-link-label">{label ? label : "Label"}</span>
        <span className="target-link-title">{title ? title : "Title"}</span>
        {option ? (
          <span className="target-link-option">{option}</span>
        ) : null}

      </a>
    );
  }
}


      // <div>
      //   <Typo>FGH</Typo>
      // </div>


      // <a className="next-previous-link next-previous-link--next bx--col-lg-6 bx--col-md-4 bx--col-sm-2">