import React, { useContext, useEffect } from "react";
import { store  } from '../../store.js';
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

const ZoomPanel = props => {

  const { state, dispatch } = useContext(store);
  const { mapSettings, viewport } = state;
  const { ...others } = props;



  const { minZoom, maxZoom } = mapSettings;
  const zoom = viewport.zoom;

  let zoomNumber = zoom;
  useEffect(
    () => {
      if (zoomNumber !== zoom) {
        setTimeout(() => { zoomNumber = zoom; }, 500);
      }
    }, [zoom]
  );

  return (
    <div className="lf-ZoomPanel" style={style.root} {...others}>
      <IconButton
        style={style.button}
        kind="secondary"
        disabled={zoom === maxZoom ? true : false}
        onClick={() => dispatch({ type: 'zoom in' })}
        // onClick={() => dispatch({ type: 'set zoom', value: zoom + 1 })}
        renderIcon={add}
        iconDescription="Zoom in"
      />

      {/* 
      <Indicator
        className="lf-ZoomPanel-indicator"
        zoom={zoom} 
        maxZoom={maxZoom}
      /> 
      */}

      <IconButton
        style={style.button}
        kind="secondary"
        disabled={zoom === minZoom ? true : false}
        onClick={() => dispatch({ type: 'set zoom', value: zoom - 1 })}
        renderIcon={minus}
        iconDescription="Zoom out"
      />
    </div>
  );
}

export default ZoomPanel;

const Indicator = ({ zoom, maxZoom, className, ...other }) => {

  const zoomNumber = zoom;
  useEffect(
    () => {
      if (zoomNumber !== zoom) {
        setTimeout(() => { zoomNumber = zoom; }, 500);
      }
    }, [zoom]
  );
  let maxedOut = false;
  if (zoom >= maxZoom) {
    maxedOut = true;
  } else {
    maxedOut = false;
  }

  const classes = `${className}${maxedOut ? " maxedOut" : ""}`;
  
  return (
    <div className={classes} {...other}>
      <span>{zoomNumber}</span>
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
