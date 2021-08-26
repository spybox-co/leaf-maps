import React, { useContext } from 'react';
import { store } from '../../../store.js';

import ReactToPrint from "react-to-print";
import { CodeSnippet, Button } from "carbon-components-react";
// import Typo from "./components/Typography";
// import Tile from "./components/Tile"


//import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";

export default () => {
  const { state } = useContext(store);
  return(
    <>
    {/* <Tile style={expandStyle}>
      <Typo>My position:</Typo>
      <CodeSnippet>{`COORDS ENABLED: ${coordsEnabled}`}</CodeSnippet>
      {coordsEnabled ? (
        <>
          <CodeSnippet>{`POS.LAT: ${position.lat}`}</CodeSnippet>
          <CodeSnippet>{`POS.LNG: ${position.lng}`}</CodeSnippet>
          <Button 
            renderIcon={Launch16}
            kind="secondary"
            href={`https://www.google.pl/maps/@${position.lat},${position.lng},${viewport.zoom}z`}
            target="_blank"
          >Show my position on Google Maps</Button>
        </>
      ) : (
        <Button
          renderIcon={icon}
          iconDescription="Locate your position!"
          onClick={event => {
            this.getLocation();
            this.focusZoomWhenCoordEnabled();
            this.setState({ autoCenterMap: true });
            event.preventDefault();
          }}
        >Get my position now</Button>
      )}
    </Tile>

    <Tile style={expandStyle}>
      <Typo>Viewport:</Typo>
      <CodeSnippet>{`AUTO CENTER MAP: ${autoCenterMap}`}</CodeSnippet>
      {!autoCenterMap && coordsEnabled ? (
        <Button
          renderIcon={icon}
          iconDescription="Locate your position!"
          onClick={event => {
            //this.getLocation();
            this.focusZoomWhenCoordEnabled();
            this.setState({ autoCenterMap: true });
            event.preventDefault();
          }}
        >Center map to my position</Button>
        ) : null}
      {!autoCenterMap ? (
        <>
          <CodeSnippet>{`VP.LAT: ${viewport.center[0]}`}</CodeSnippet>
          <CodeSnippet>{`VP.LNG: ${viewport.center[1]}`}</CodeSnippet>
        </>
      ) : null}
      <Button 
        renderIcon={Launch16}
        kind="secondary"
        href={`https://www.google.pl/maps/@${viewport.center[0]},${viewport.center[1]},${viewport.zoom}z`}
        target="_blank"
      >Show this view on Google Maps</Button>
    </Tile>
    <Tile style={expandStyle}>
      <Typo>Print Map</Typo>
      <ReactToPrint
        trigger={() => 
          <Button 
            kind="secondary"
            renderIcon={Printer}
          >Print map out (viewport)</Button>}
        content={() => this.componentRef}
      />
    </Tile>

    <Tile style={expandStyle}>
      <Typo>Status</Typo>
      <GeoLocate ref={getInnerRef} getCoordsEnabled={getCoordsEnabled} focusZoom={focusZoom}/>
      <Locator />
    </Tile> */}
  </>
  )
};







const expandStyle = { color: `black` };

