import React, { Component, Fragment } from "react";

import { Button, ClickableTile, CodeSnippet } from "carbon-components-react";

export default class Locator extends Component {
  constructor() {
    super();
    this.state = {
      currentLatLng: ""
    };
  }
  // Stack:
  // https://stackoverflow.com/questions/50780417/update-google-map-based-on-geolocation-with-react
  componentDidMount() {
    this.getGeoLocation();
  }
  componentDidUpdate() {
    this.getGeoLocation();
  }
  getGeoLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords);
        this.setState(prevState => ({
          currentLatLng: {
            ...prevState.currentLatLng,
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }));
      });
    } else {
      error => console.log(error);
    }
  };
  render() {
    const position = this.state.currentLatLng;
    return (
      <div>
        {position !== "" ? (
          <Fragment>
            <CodeSnippet>{`latitude: ${position.lat}`}</CodeSnippet>
            <CodeSnippet>{`longitude: ${position.lng}`}</CodeSnippet>
          </Fragment>
        ) : (
          <span>Niet!</span>
        )}
      </div>
    );
  }
}
