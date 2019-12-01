import React, { Component } from "react";
//import { ClickableTile, TextInput } from "carbon-components-react";
import IconButton from "./IconButton";

const style = {
  root: {
    display: `flex`,
    flexWrap: `nowrap`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    alignItems: `flex-end`
  },
  number: {
    width: 48,
    height: 48,
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    backgroundColor: `#f3f3f3`
  },
  button: {
    minHeight: 40,
    width: 48,
    height: 48,
    justifyContent: `center`,
    alignItems: `center`
  }
};

export default class ZoomPanel extends Component {
  constructor() {
    super();
    this.state = {
      invalid: false
    };
  }

  zoomIn = () => {
    this.props.setZoom(this.props.zoom + 1);
  };
  zoomOut = () => {
    this.props.setZoom(this.props.zoom - 1);
  };

  render() {
    const { zoom, setZoom, minZoom, maxZoom, ...others } = this.props;
    return (
      <div className="lf-ZoomPanel" style={style.root} {...others}>
        <IconButton
          style={style.button}
          kind="secondary"
          disabled={zoom === undefined || zoom === maxZoom ? true : false}
          onClick={event => this.zoomIn()}
          renderIcon={add}
          iconDescription="Zoom in"
        />
        <div style={style.number}>
          <span>{`${zoom ? zoom.toFixed() : "-"}`}</span>
        </div>
        <IconButton
          style={style.button}
          kind="secondary"
          disabled={zoom === undefined || zoom === minZoom ? true : false}
          onClick={event => this.zoomOut()}
          renderIcon={minus}
          iconDescription="Zoom out"
        />
      </div>
    );
  }
}

const minus = () => {
  return (
    <svg
      x="0px"
      y="0px"
      style={{ fill: `#ffffff` }}
      width="12px"
      height="12px"
      viewBox="0 0 16 16"
    >
      <rect x="4" y="7.5" width="8" height="1" />
    </svg>
  );
};
const add = () => {
  return (
    <svg
      x="0px"
      y="0px"
      style={{ fill: `#ffffff` }}
      width="12px"
      height="12px"
      viewBox="0 0 16 16"
    >
      <polygon points="8.5,7.5 8.5,3 7.5,3 7.5,7.5 3,7.5 3,8.5 7.5,8.5 7.5,13 8.5,13 8.5,8.5 13,8.5 13,7.5 " />
    </svg>
  );
};
