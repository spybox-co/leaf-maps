import React, { Component } from "react";
//import { ClickableTile, TextInput } from "carbon-components-react";
import IconButton from "../IconButton";


import "./ZoomPanel.scss";

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
      invalid: false,
      zoom: 0
    };
  }

  zoomIn = () => {
    this.props.setZoom(this.props.zoom + 1);
  };
  zoomOut = () => {
    this.props.setZoom(this.props.zoom - 1);
  };

  setZoomNumber = (value) => {
    let number = Number.isInteger(value) ? value : Math.ceil(value);
    this.setState({ zoom: number })
  }

  componentDidMount() {
    this.setZoomNumber(this.props.zoom);
  }
  componentDidUpdate(prevProps) {
    if (this.props.zoom !== prevProps.zoom) {
      this.setZoomNumber(this.props.zoom);
    }
  }

  render() {
    const { setZoom, minZoom, maxZoom, ...others } = this.props;
    const { zoom } = this.state;
    const { zoomIn, zoomOut } = this;
    return (
      <div className="lf-ZoomPanel" style={style.root} {...others}>
        <IconButton
          style={style.button}
          kind="secondary"
          disabled={zoom === undefined || zoom === maxZoom ? true : false}
          onClick={event => zoomIn()}
          renderIcon={add}
          iconDescription="Zoom in"
        />

        <Indicator
          className="lf-ZoomPanel-indicator"
          zoom={zoom} 
          maxZoom={maxZoom}
        />

        <IconButton
          style={style.button}
          kind="secondary"
          disabled={zoom === undefined || zoom === minZoom ? true : false}
          onClick={event => zoomOut()}
          renderIcon={minus}
          iconDescription="Zoom out"
        />
      </div>
    );
  }
}

const Indicator = ({ zoom, maxZoom, className, ...other }) => {
  let maxedOut = false;
  if (zoom >= maxZoom) {
    maxedOut = true;
  } else {
    maxedOut = false;
  }

  const classes = `${className}${maxedOut ? " maxedOut" : ""}`;
  
  return (
    <div className={classes} {...other}>
      <span>{zoom}</span>
    </div>
  )
}

const minus = () => {
  return (
    <svg
      x="0px"
      y="0px"
      style={{ fill: `#ffffff` }}
      width="16px"
      height="16px"
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
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
    >
      <polygon points="8.5,7.5 8.5,3 7.5,3 7.5,7.5 3,7.5 3,8.5 7.5,8.5 7.5,13 8.5,13 8.5,8.5 13,8.5 13,7.5 " />
    </svg>
  );
};
