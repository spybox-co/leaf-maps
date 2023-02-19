import React, { 
  useContext
  // useEffect 
} from 'react';
import { store  } from '../../../store.js';
//import { ClickableTile, TextInput } from "carbon-components-react";
import { IconButton } from '../../../components/Button';


import './ZoomPanel.scss';

const ZoomPanel = props => {
  const {
    size = 'medium', 
    ...others
  } = props;

  const { state, dispatch } = useContext(store);
  const { mapSettings, viewport } = state;



  const { minZoom, maxZoom } = mapSettings;
  const zoom = viewport.zoom;

  // let zoomNumber = zoom;

  // Assignments to the 'zoomNumber' variable from inside React Hook useEffect will be lost after each render. 
  // To preserve the value over time, store it in a useRef Hook and keep the mutable value in the '.current' property. 
  // Otherwise, you can move this variable directly inside useEffect  react-hooks/exhaustive-deps

  /*
  useEffect(
    () => {
      if (zoomNumber !== zoom) {
        setTimeout(() => { zoomNumber = zoom; }, 500);
      }
    }, [zoom]
  );
  */

  const classes = [
    'lf-ZoomPanel',
    'lf-Control',
    size ? `${size}` : null
  ].join(' ').trim();

  return (
    <div className={classes} {...others}>
      <IconButton
        kind="ghost"
        size={size}
        disabled={zoom === maxZoom ? true : null}
        onClick={() => dispatch({ type: 'zoom in' })}
        // onClick={() => dispatch({ type: 'set zoom', value: zoom + 1 })}
        renderIcon="Add"
        iconDescription="Zoom in"
      />

      
      <Indicator
        className="lf-ZoomPanel-indicator"
        zoom={zoom} 
        maxZoom={maxZoom}
      /> 
     

      <IconButton
        kind="ghost"
        size={size}
        disabled={zoom === minZoom ? true : null}
        onClick={() => dispatch({ type: 'set zoom', value: zoom - 1 })}
        renderIcon="Substract"
        iconDescription="Zoom out"
      />
    </div>
  );
}

export default ZoomPanel;

const Indicator = ({ zoom, maxZoom, className, ...other }) => {

  /*
  let zoomNumber = zoom;
  useEffect(
    () => {
      if (zoomNumber !== zoom) {
        setTimeout(() => { zoomNumber = zoom; }, 500);
      }
    }, [zoom]
  );
  */

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


