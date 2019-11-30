import React, { Component } from "react";

import IconButton from "../IconButton";
import Up from "@carbon/icons-react/es/up-to-top/16";
import Down from "@carbon/icons-react/es/down-to-bottom/16";

import "./ExpandablePanel.css";

export default class ExpandablePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.actionCollapse = this.actionCollapse.bind(this);
  }

  actionCollapse = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }));
  };

  render() {
    const { collapsed } = this.state;

    const icon = collapsed ? Up : Down;

    const collapse = collapsed ? " collapsed" : "";
    return (
      <div className={`lf-Panel${collapse}`}>
        <div className="lf-Panel-header">
          <div
            className="lf-Panel-header-title"
            style={{
              display: `inline-flex`,
              justifyContent: `flex-end`,
              alignItems: `center`
            }}
          >
            {this.props.title}
          </div>
          <div
            style={{
              display: `inline-flex`,
              justifyContent: `flex-end`,
              flex: `1 1 0%`
            }}
          >
            <IconButton
              id="locator"
              kind={`secondary`}
              renderIcon={icon}
              iconDescription="Locate your position!"
              onClick={event => {
                this.actionCollapse();
                event.preventDefault();
              }}
            />
          </div>
        </div>
        <div className="lf-Panel-container">{this.props.children}</div>
      </div>
    );
  }
}
