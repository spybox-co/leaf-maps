import React, { Component } from "react";
import axios from "axios";
import ReactToPrint from "react-to-print";

import Map from "./components/Map/Map";
import GeoLocate from "./GeoLocate";
import Locator from "./components/Locator";

import UIHeader from "./components/Header/UIHeader";
//import UIFooter from "./components/Footer/UIFooter";
import IconButton from "./components/IconButton";
import Typo from "./components/Typography";
import Tile from "./components/Tile"
//import Panel from "./components/Panel";
import ZoomPanel from "./components/ZoomPanel/ZoomPanel";
import ExpandablePanel from "./components/ExpandablePanel/ExpandablePanel";
//import CaptureScreen from "./components/CaptureScreen/CaptureScreen";

import { CodeSnippet, Button } from "carbon-components-react";
import { Content as UIContent } from "carbon-components-react/lib/components/UIShell";



import * as LocationAPI from "./utils/getUserLocationData";

import data from "./utils/MapsData.json";

import "./App.scss";


import AddFilled16 from "@carbon/icons-react/es/add--filled/16";
import AddAlt16 from "@carbon/icons-react/es/add--alt/16";
import Launch16 from "@carbon/icons-react/es/launch/16";


//import { Printer, iconAddSolid, iconAddOutline } from 'carbon-icons';
//import { Printer16 } from '@carbon/icons-react';



// GEOLOCATION React
// https://www.npmjs.com/package/react-geolocated
// https://github.com/trekhleb/use-position - seems lite lib!

// User Aprox Location APIS:
// https://geolocation-db.com/json/

// Geolocation MDN
// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation

// RxJS - state management
// https://www.robinwieruch.de/react-rxjs-state-management-tutorial/

// CALLBACK in setState:
// this.setState({param}, () => console.log(this.state.param));

// LOCAL STORAGE
// https://www.robinwieruch.de/local-storage-react

// Get Capture Screen Image:
// html2canvas: https://stackblitz.com/edit/react-screen-capture?file=ScreenCapture.js
// dom-to-image: https://github.com/tsayen/dom-to-image


const initData = {
  zoom: 6,
  center: [0, 0],
  mapFocus: 17,
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      minZoom: 1,
      maxZoom: 20,
      BaseMapsData: data,
      selectedMap: [],
      autoCenterMap: false,
      coordsEnabled: false,
      viewport: {
        center: initData.center,
        zoom: initData.zoom
      },
      position: {
        lat: 0,
        lng: 0
      },
      scrollWheel: true,
      lastMaps: [], // To-do
      errors: null
    };

    this.getInnerRef = this.getInnerRef.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount() {
    this.loadMap();
    this.getUserLocationData();
  }

  loadMap = () => {
    const { BaseMapsData } = this.state;
    let mapToLoad;
    let lastMap = localStorage.getItem('lastMap');
    if (lastMap !== null) {
      mapToLoad = Number(lastMap); //parseInt(lastMap, 10);
    } else {
      mapToLoad = 0;
    }
    this.setState({
      selectedMap: {
        url: BaseMapsData[mapToLoad].url,
        apikey: BaseMapsData[mapToLoad].apikey
          ? this.state.BaseMapsData[mapToLoad].apikey
          : null,
        maxZoom: BaseMapsData[mapToLoad].maxZoom ? BaseMapsData[mapToLoad].maxZoom : 20
      }
    });
    if (BaseMapsData[mapToLoad].maxZoom) {
      this.setState({ maxZoom: BaseMapsData[mapToLoad].maxZoom });
    }
  };

  changeMap = (vendor, type, mapUrl, maxZoom, apiKey, index) => {
    const { viewport } = this.state;
    const key = apiKey ? apiKey : null;
    const zoom = maxZoom ? maxZoom : 20;
    this.setState(
      {
        selectedMap: { url: mapUrl, apikey: key, maxZoom: zoom }
      },
      () => console.log(this.state.selectedMap)
    );
    localStorage.setItem('lastMap', index);
    console.log("Local Stored Map ID:", localStorage.getItem('lastMap'), typeof localStorage.getItem('lastMap'));
    if (maxZoom) {
      this.setState({ maxZoom: maxZoom }, () => console.log("max limited here:", this.state.maxZoom));
      if (maxZoom < viewport.zoom) {
        this.setZoom(maxZoom);
      }
    } else {
      this.setState({ maxZoom: 20 }, () => console.log("max default:", this.state.maxZoom));
    }
  };

  disableAutoCenterMap = () => {
    this.setState({ autoCenterMap: false });
  };

  getCoordsEnabled = (lat, lng) => {
    this.setState({ coordsEnabled: true, position: { lat: lat, lng: lng } });
    //this.focusZoom(initData.mapFocus)
  };

  focusZoom = value => {
    let zoom = this.state.viewport.zoom;
    let maxZoom = this.state.selectedMap.maxZoom;
    
    if (value > maxZoom) {
      value = maxZoom;
    }
    if (value > zoom) {
      setTimeout(() => {
        this.setZoom(value);
      }, 1000);
    }
  };

  setZoom = value => {
    this.setState({
      viewport: {
        center: this.state.viewport.center,
        zoom: value
      }
    });
  };

  focusZoomWhenCoordEnabled = () => {
    if (this.state.coordsEnabled) {
     this.focusZoom(initData.mapFocus);
    }
  }

  onViewportChanged = viewport => {
    const zoom = viewport.zoom >= this.state.maxZoom ? this.state.maxZoom : viewport.zoom;
    this.setState({
      viewport: {
        center: viewport.center,
        zoom: zoom
      }
    });
    let position = JSON.stringify(viewport.center)
    localStorage.setItem("lastViewportDataPosition", position);
    localStorage.setItem("lastViewportDataZoomNumber", zoom);
    let storedPosition = localStorage.getItem("lastViewportDataPosition");
    let zoomNumberStored = localStorage.getItem("lastViewportDataZoomNumber");
    // console.log(storedPosition);
    let array = JSON.parse(storedPosition);
    // console.log(array);
    // console.log(zoomNumberStored);
  };

  innerRef;

  getInnerRef(ref) {
    this.innerRef = ref;
  }

  getLocation() {
    this.innerRef && this.innerRef.getLocation();
  }

  getUserLocationData = () => {
    let location = [];
    let storedPosition = localStorage.getItem("lastViewportDataPosition");
    let zoomNumberStored = localStorage.getItem("lastViewportDataZoomNumber");
    if (storedPosition && zoomNumberStored) {
      location = JSON.parse(storedPosition)
      console.log("LocationStored:", location);
      this.setState(prevState => ({
        viewport: {
          center: location,
          zoom: zoomNumberStored
        }
      }));
    } else {
      axios
      .get(LocationAPI.GEOLOCDB)
      .then(res => {
        const response = res.data;
        location = [response.latitude, response.longitude];
        console.log(response);
        this.setState(prevState => ({
          viewport: {
            ...prevState.viewport,
            center: location,
          }
        }));

      })
      .catch(error => {
        location = [51,0];
        console.log(error)
        this.setState(prevState => ({
          viewport: {
            ...prevState.viewport,
            center: location,
          }
        }));
      });
    }
  };
  handleGeolocatePosition = () => {
    const { coordsEnabled, autoCenterMap } = this.state;
    if (coordsEnabled && autoCenterMap) {
      this.setState({ coordsEnabled: false, autoCenterMap: false });
    }
    if (!coordsEnabled && !autoCenterMap) {
      this.getLocation();
      this.setState({ autoCenterMap: true });
    }
    if (coordsEnabled && !autoCenterMap) {
      this.getLocation();
      this.setState({ autoCenterMap: true });
    }
  }

  render() {
    const {
      position,
      minZoom,
      maxZoom,
      BaseMapsData,
      selectedMap,
      autoCenterMap,
      coordsEnabled,
      viewport,
      scrollWheel
    } = this.state;

    const {
      changeMap,
      onViewportChanged,
      disableAutoCenterMap,
      getCoordsEnabled,
      setZoom,
      focusZoom
    } = this;

    const { getInnerRef } = this;

    const kind = coordsEnabled
      ? autoCenterMap
        ? "primary"
        : "danger"
      : "secondary";

    const icon = coordsEnabled ? AddFilled16 : AddAlt16;

    return (
      <div className="App">
        <UIHeader
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}
          selectedMap={selectedMap}
        > 
          {/* <CaptureScreen /> */}

          <IconButton
            id="locator"
            kind={kind}
            renderIcon={icon}
            iconDescription="Locate your position!"
            onClick={event => {
              this.getLocation();
              this.focusZoomWhenCoordEnabled();
              //this.handleGeolocatePosition(); //NEED REVIEW ALL STATES
              this.setState({ autoCenterMap: true });
              //event.preventDefault();
            }}
          />
        </UIHeader>
        
        <UIContent>
          {/* <Panel /> */}

          <Map
            minZoom={minZoom}
            maxZoom={maxZoom}
            selectedMap={selectedMap}
            ref={getInnerRef}
            ref={print => (this.componentRef = print)}
            autoCenterMap={autoCenterMap}
            onViewportChanged={onViewportChanged}
            disableAutoCenterMap={disableAutoCenterMap}
            getCoordsEnabled={getCoordsEnabled}
            coordsEnabled={coordsEnabled} // ONLY for tests!
            viewport={viewport}
            position={position}
            scrollWheel={scrollWheel}
            setZoom={setZoom} 
          />
          <ZoomPanel
            zoom={viewport.zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            setZoom={setZoom}
          />
        </UIContent>
        {/* <UIFooter /> */}
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
        </ExpandablePanel>
      </div>
    );
  }
}

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