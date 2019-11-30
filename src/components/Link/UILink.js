import React, { Component } from "react";

import "./UILink.css";

export default class Link extends Component {
  render() {
    const { label, title, option, active, ...other } = this.props;

    const isActive = active ? " active" : "";

    return (
      <a className={`target-link${isActive}`} {...other}>
        <span className="target-link-label">{label ? label : "Label"}</span>
        <span className="target-link-title">{title ? title : "Title"}</span>
        {option ? <span className="target-link-option">{option}</span> : null}
        {active ? <div className="target-link-active-label" /> : null}
      </a>
    );
  }
}
