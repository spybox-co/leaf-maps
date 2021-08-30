import React, { Component } from 'react';

import UIHeader from './components/Header';

// Carbon Components
import { Content as UIContent } from "carbon-components-react/lib/components/UIShell";

import Map from './components/Map';
// eslint disable-next-line
import ZoomPanel from "./components/ZoomPanel";

// TO-USE in future:
//import CaptureScreen from "./components/CaptureScreen/CaptureScreen";
//import Panel from "./components/Panel";
//import UIFooter from "./components/Footer/UIFooter";

import "./App.scss";



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


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lastMaps: [], // To-Do -> push to localStore used last 3 maps 
    };
  }

  // https://blog.anam.co/progressive-web-apps-with-create-react-app/
  installPrompt = null;

  componentDidMount() {
    console.log("👋 mounted");
    console.log('screen rientation is ', window.screen.orientation.type)
    window.screen.orientation.addEventListener('change', function() {
      console.log('new orientation is ', window.screen.orientation.type);
    });
  }

  customInstallPWAPrompt = () => {
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
    });
  }

  render() {
    return (
      <div className="App">
        <UIHeader />
        <UIContent>
          <Map />
          <ZoomPanel />
        </UIContent>
      </div>
    );
  }
}






