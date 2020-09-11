import ReactToPrint from "react-to-print";
import { CodeSnippet, Button } from "carbon-components-react";
import Typo from "./components/Typography";
import Tile from "./components/Tile"


import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";

{panel ? (
  <ExpandablePanel title="Console">
    <Tile style={expandStyle}>
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
    </Tile>
  </ExpandablePanel>) : null}








const expandStyle = { color: `black` };


const Printer = () => (
  <svg 
    focusable="false" 
    preserveAspectRatio="xMidYMid meet" 
    xmlns="http://www.w3.org/2000/svg" 
    width="32" 
    height="32" 
    viewBox="0 0 32 32" 
    aria-hidden="true"
    className="bx--btn__icon"
  >
    <path d="M28,9H25V3H7V9H4a2,2,0,0,0-2,2V21a2,2,0,0,0,2,2H7v6H25V23h3a2,2,0,0,0,2-2V11A2,2,0,0,0,28,9ZM9,5H23V9H9ZM23,27H9V17H23Zm5-6H25V15H7v6H4V11H28Z"></path>
    <title>Printer</title>
  </svg>
)