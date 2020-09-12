import React, { Component } from 'react';
import axios from 'axios';


import UIHeader from './components/Header';

// Carbon Components
import { Content as UIContent } from "carbon-components-react/lib/components/UIShell";

import Map from './components/Map';
// eslint disable-next-line
import ZoomPanel from "./components/ZoomPanel/ZoomPanel";







// TO-USE in future:
//import CaptureScreen from "./components/CaptureScreen/CaptureScreen";
//import Panel from "./components/Panel";
//import UIFooter from "./components/Footer/UIFooter";

import * as LocationAPI from "./utils/getUserLocationData";

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
      viewport: {
        center: initData.center,
        zoom: initData.zoom
      },
      position: {
        lat: 0,
        lng: 0
      },
      lastMaps: [], // To-Do -> push to localStore used last 3 maps 
      errors: null,
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

    this.getUserLocationData();    

    console.log("👋 mounted");
  }


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
    return (
      <div className="App">
        <UIHeader />

        {/* Carbon Component */}
        <UIContent>
          <Map />
          <ZoomPanel />
        </UIContent>
      </div>
    );
  }
}






