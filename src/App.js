import React, { Component } from "react";
import axios from "axios";


import UIHeader from "./components/Header/UIHeader";



// Carbon Components
import { Content as UIContent } from "carbon-components-react/lib/components/UIShell";

import Map from './components/Map/MapContainer';
// eslint disable-next-line
import ZoomPanel from "./components/ZoomPanel/ZoomPanel";
// import Map from "./components/Map/Map";







// TO-USE in future:
//import CaptureScreen from "./components/CaptureScreen/CaptureScreen";
//import Panel from "./components/Panel";
//import UIFooter from "./components/Footer/UIFooter";

import * as LocationAPI from "./utils/getUserLocationData";

import data from "./utils/MapsData.json";

import "./App.scss";

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
      startLocate: false,
      viewport: {
        center: initData.center,
        zoom: initData.zoom
      },
      position: {
        lat: 0,
        lng: 0
      },
      scrollWheel: true,
      lastMaps: [], // To-Do -> push to localStore used last 3 maps 
      errors: null,
      width: 0,
      height: 0,
      panel: false
    };
  }

  // https://blog.anam.co/progressive-web-apps-with-create-react-app/
  installPrompt = null;
  componentDidMount(){
    console.log("Listening for Install prompt");
    window.addEventListener('beforeinstallprompt',e=>{
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if((window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true){
        return false;
      }
      // Set the state variable to make button visible
      this.setState({
        installButton:true
      })
    })


    this.loadMap();
    this.getUserLocationData();    
    this.handleWindowSizeChange(); // Set width
    window.addEventListener("resize", this.handleWindowSizeChange);
    console.log("👋 mounted");
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.setState({ width: width, height: height });
  };

  // Migrate to ContextAPI
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


  render() {
    const {
      position,
      minZoom,
      maxZoom,
      BaseMapsData,
      selectedMap,
      autoCenterMap,
      coordsEnabled,
      startLocate,
      viewport,
      scrollWheel,
    } = this.state;

    const {
      changeMap,
      disableAutoCenterMap,
      getCoordsEnabled,
      setZoom,
    } = this;


    return (
      <div className="App">
        <UIHeader
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}
          selectedMap={selectedMap}
        />

        {/* Carbon Component */}
        <UIContent>
          <Map
            minZoom={minZoom}
            maxZoom={maxZoom}
            selectedMap={selectedMap}
            autoCenterMap={autoCenterMap}
            disableAutoCenterMap={disableAutoCenterMap}
            getCoordsEnabled={getCoordsEnabled}
            coordsEnabled={coordsEnabled} // ONLY for tests!
            viewport={viewport}
            position={position}
            scrollWheel={scrollWheel}
            setZoom={setZoom} 
            startLocate={startLocate}
          />
          <ZoomPanel />
        </UIContent>

      </div>
    );
  }
}






