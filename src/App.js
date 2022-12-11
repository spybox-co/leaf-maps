import React, { useContext } from 'react';
import { store } from 'store.js';
import { Header, Content } from './modules/Shell';
import UIMenu from './components/Menu/UIMenu';

import Map from './containers/Map';
import { ZoomPanel, Attribution } from "./modules/Controls";

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


const App = () => {
  const { state, dispatch } = useContext(store);

  const actionMenuHandle = () => {
    dispatch({ type: 'toggle menu'})
  };

  const { expanded, compactMode } = state;


    return (
      <div className="App">
        <Header />
        <UIMenu
          expanded={expanded}
          actionMenuHandle={actionMenuHandle}
        />
        <Content expanded={expanded}>
          <Map>          
            <ZoomPanel />
            <Attribution />
          </Map>

        </Content>
      </div>
    );
  }
export default App;

// https://blog.anam.co/progressive-web-apps-with-create-react-app/

/*
const installPrompt = null;

const customInstallPWAPrompt = () => {
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
*/