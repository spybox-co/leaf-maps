import React, { useContext } from 'react';
import { store } from '../../../store.js';

import { CodeSnippet, ExpandableTile, TileBelowTheFoldContent, TileAboveTheFoldContent } from "carbon-components-react";
import { Button } from "../../../components/Button";
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
  const { autoCenterMap, position, viewport, startLocate, geolocation } = state;
 

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
    <div className="Console theme-light">
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
                    kind="ghost"
                    anchor
                    href={`https://www.google.pl/maps/@${position[0]},${position[1]},${viewport.zoom}z`}
                    target="_blank"
                  >Show my position on Google Maps</Button>
            </div>
            
          </TileBelowTheFoldContent>
        </ExpandableTile>
      )}
            {geolocation && (     
      <Tile style={expandStyle}>
        <Typo>Status</Typo>
        
          <CodeSnippet type="multi">
            {`
Latitude:          ${geolocation.latitude}
Longitude:         ${geolocation.longitude}
Location accuracy: ${geolocation.accuracy}
Altitude:          ${geolocation.altitude}
Altitude accuracy: ${geolocation.altitudeAccuracy}
Speed:             ${geolocation.speed}
Timestamp:         ${geolocation.timestamp}
            `}
          </CodeSnippet>       
        
        {/* <GeoLocate ref={getInnerRef} position={position} focusZoom={focusZoom}/> */}
        {/* <Locator /> */}
      </Tile>
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

