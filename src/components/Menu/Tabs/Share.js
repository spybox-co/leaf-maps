import React, { useContext } from 'react';
import { store } from '../../../store.js';

import ReactToPrint from "react-to-print";
// eslint-disable-next-line
import { CodeSnippet, ExpandableTile, TileBelowTheFoldContent, TileAboveTheFoldContent } from "carbon-components-react";
import { Button } from "../../Button";
// eslint-disable-next-line
import Typo from "../../Typography";
// eslint-disable-next-line
import Tile from "../../Tile";

// import Icon from "../../../components/Icon";

//import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";


// Screen Print Leaflet
// https://github.com/grinat/leaflet-simple-map-screenshoter

// https://github.com/tsayen/dom-to-image & https://www.npmjs.com/package/dom-to-image
// Use with ref -> https://stackoverflow.com/questions/55591967/is-it-correct-to-use-dom-to-image-module-in-reactjs-app/56476101


export default () => {
  const { state } = useContext(store);
  // eslint-disable-next-line
  const { autoCenterMap, position, viewport, startLocate, geolocation } = state;
 
  return(
    <div className="Console theme-light">
      <StaticTile>
      <h5>Show on Google Maps</h5>

      {startLocate && position !== null && (
                <Button 
                  renderIcon={"Launch"}
                  kind="primary"
                  anchor
                  href={`https://www.google.pl/maps/@${position[0]},${position[1]},${viewport.zoom}z`}
                  target="_blank"
                >Current position</Button>
            )}

      <Button 
          renderIcon={"Launch"}
          kind="tertiary"
          anchor
          // disabled={autoCenterMap ? true : null}
          href={!autoCenterMap ? `https://www.google.pl/maps/@${viewport.center[0]},${viewport.center[1]},${viewport.zoom}z` : null}
          target="_blank"
        >Current viewport</Button>
      </StaticTile>

      <StaticTile style={expandStyle}>
        <h6>Print Map</h6>
        <ReactToPrint
          trigger={() => 
            <Button 
              kind="secondary"
              renderIcon={"Printer"}
              disabled
            >Print map out (viewport)</Button>}
          content={() => this.componentRef}
        />
      </StaticTile>

    </div>
  )
};



const StaticTile = ({ children }) => (
  <div className="bx--tile" style={{ padding: `1rem`, ...expandStyle }}>
    {children}
  </div>
)



const expandStyle = { color: `black` };

