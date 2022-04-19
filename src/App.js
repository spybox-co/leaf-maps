import React, { useEffect } from 'react';
import { Header, Content } from './modules/Shell';

import Map from './containers/Map';
import ZoomPanel from './modules/ZoomPanel';
import Attribution from './modules/Attribution';

// TO-USE in future:
//import CaptureScreen from "./components/CaptureScreen/CaptureScreen";
//import Panel from "./components/Panel";
//import UIFooter from "./components/Footer/UIFooter";

import './App.scss';



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

// PWA Prompt
// https://blog.anam.co/progressive-web-apps-with-create-react-app/

export default function App() {

  useEffect(() => {
    console.log("👋 mounted");
    console.log("screen orientation is ", window.screen.orientation.type)
    window.screen.orientation.addEventListener('change', function() {
      console.log("new orientation is ", window.screen.orientation.type);
    });
  });

  return(
    <div className="App">
      <Header />
      <Content>
        <Map />
        <ZoomPanel />
        <Attribution />
      </Content>
    </div>
  );
}

