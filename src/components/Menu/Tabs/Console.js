import React, { useContext } from 'react';
import { store } from '../../../store.js';

import ReactToPrint from "react-to-print";
import { CodeSnippet, ExpandableTile, TileBelowTheFoldContent, TileAboveTheFoldContent } from "carbon-components-react";
import {Button} from "../../../components/Button";
import Typo from "../../../components/Typography";
import Tile from "../../../components/Tile";

// import Icon from "../../../components/Icon";

//import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";


// Screen Print Leaflet
// https://github.com/grinat/leaflet-simple-map-screenshoter

// https://github.com/tsayen/dom-to-image & https://www.npmjs.com/package/dom-to-image
// Use with ref -> https://stackoverflow.com/questions/55591967/is-it-correct-to-use-dom-to-image-module-in-reactjs-app/56476101


export default () => {
  const { state, dispatch } = useContext(store);
  const { autoCenterMap, position, viewport, startLocate } = state;
 

  const handleGetPositionNow = () => {
    if (!startLocate) {
      dispatch({ type: 'start locate', value: true });
      dispatch({ type: 'center map', value: true });
    } else {
      dispatch({ type: 'locate off' });
    }
  }
  const handleCenterMapOnPositionNow = () => {
    if (!autoCenterMap) {
      dispatch({ type: 'start locate', value: true });
      dispatch({ type: 'center map', value: true });
    }
  }
  return(
    <div className="Console">
      <StaticTile>
      <h3>My position</h3>
      {startLocate && position !== null ? (
              <Button
                renderIcon={"Locate"}
                kind="danger"
                iconDescription="Locate your position!"
                onClick={handleGetPositionNow}
              >Turn off locating service</Button>
            ) : (
              <Button
                renderIcon={"Locate"}
                iconDescription="Locate your position!"
                onClick={handleGetPositionNow}
                disabled={startLocate}
              >Get my position now</Button>
            )}
      </StaticTile>

      {position === null ? (
        <Tile style={expandStyle}>

          <h6>Position active geolocation</h6>
          <CodeSnippet type="inline">{`${position ? "enabled" : "not active"}`}</CodeSnippet>
  
  
        </Tile>
      ) : (
        <ExpandableTile expanded={position ? true : false}>
          <TileAboveTheFoldContent>
            <div style={{ height: '7rem', ...expandStyle }}>
              <h6>Position active geolocation</h6>
              <CodeSnippet type="inline">{`${position ? "enabled" : "not active"}`}</CodeSnippet>
            </div>
          </TileAboveTheFoldContent>
          <TileBelowTheFoldContent>
            <div style={{ height: '18rem', color: autoCenterMap ? `gray` : `inherit`, ...expandStyle }}>
                  <h6>Latitude</h6>
                  <CodeSnippet type="single">{`${position[0]}`}</CodeSnippet>
                  <h6>Longtitude</h6>
                  <CodeSnippet type="single">{`${position[1]}`}</CodeSnippet>
                  <Button 
                    renderIcon={"Launch"}
                    kind="secondary"
                    anchor
                    href={`https://www.google.pl/maps/@${position[0]},${position[1]},${viewport.zoom}z`}
                    target="_blank"
                  >Show my position on Google Maps</Button>
            </div>
            
          </TileBelowTheFoldContent>
        </ExpandableTile>
      )}
      {/* <Tile style={expandStyle}>

        <h6>Position active geolocation</h6>
        <CodeSnippet type="inline">{`${position ? "enabled" : "not active"}`}</CodeSnippet>


      </Tile> */}



      <Tile style={expandStyle}>
        <Typo>Viewport</Typo>
        <h6>Auto center map</h6>
        <CodeSnippet type="single">{`${autoCenterMap}`}</CodeSnippet>
        {position ? (
          <Button
            renderIcon={"Locate"}
            iconDescription="Locate your position!"
            onClick={handleCenterMapOnPositionNow}
            disabled={autoCenterMap}
          >Center map to my position</Button>
          ) : null}
        
        <div id="viewport-data" style={autoCenterMap ? { color: `gray`} : null}>
          <Typo>Latitude</Typo>
          <CodeSnippet type="single">{`${viewport.center[0]}`}</CodeSnippet>
          <h6>Longtitude</h6>
          <CodeSnippet type="single">{`${viewport.center[1]}`}</CodeSnippet>
        </div>

        <Button 
          renderIcon={"Launch"}
          kind="tertiary"
          anchor
          disabled={autoCenterMap}
          href={!autoCenterMap ? `https://www.google.pl/maps/@${viewport.center[0]},${viewport.center[1]},${viewport.zoom}z` : null}
          target="_blank"
        >Show this view on Google Maps</Button>
      </Tile>
      <Tile style={expandStyle}>
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
      </Tile>

      <Tile style={expandStyle}>
        <Typo>Status</Typo>
        {/* <GeoLocate ref={getInnerRef} position={position} focusZoom={focusZoom}/> */}
        {/* <Locator /> */}
      </Tile>
    </div>
  )
};



const StaticTile = ({ children }) => (
  <div className="bx--tile" style={{ padding: `1rem`, ...expandStyle }}>
    {children}
  </div>
)



const expandStyle = { color: `black` };

