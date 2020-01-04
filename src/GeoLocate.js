import React, { Component } from "react";
import { geolocated, geoPropTypes } from "react-geolocated";

import Typo from "./components/Typography";

import { CodeSnippet } from "carbon-components-react";

// const getDirection = (degrees, isLongitude) =>
//   degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// // addapted from http://stackoverflow.com/a/5786281/2546338
// const formatDegrees = (degrees, isLongitude) =>
//   `${0 | degrees}Â° ${0 |
//     (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)}' ${0 |
//     (((degrees * 60) % 1) * 60)}" ${getDirection(degrees, isLongitude)}`;

class GeoLocate extends Component {
  constructor() {
    super();
    this.state = {
      lat: null,
      lng: null
    };
  }
  componentDidMount() {
    if (this.props.coords) {
      this.setPosition();
    }
  }

  componentDidUpdate() {
    if (this.props.coords) {
      this.setPosition();
    }
  }

  setPosition = () => {
    if (
      this.state.lat !== this.props.coords.latitude &&
      this.state.lng !== this.props.coords.longitude
    ) {
      this.setState({
        lat: this.props.coords.latitude,
        lng: this.props.coords.longitude
      });
      this.props.getCoordsEnabled(
        this.props.coords.latitude,
        this.props.coords.longitude
      );
    }
  };

  render() {
    const { props } = this;
    return (
      <div>
        {!props.isGeolocationAvailable ? (
          <CodeSnippet type="inline">
            `Your browser does not support Geolocation.`
          </CodeSnippet>
        ) : !props.isGeolocationEnabled ? (
          <CodeSnippet type="inline">`Geolocation is not enabled`</CodeSnippet>
        ) : props.coords ? (
          <div>
            <Typo>GeoAPI Enabled!</Typo>
            <CodeSnippet>{`latitude:  ${
              props.coords.latitude ? props.coords.latitude : "common"
            }`}</CodeSnippet>
            <CodeSnippet>{`longitude: ${
              props.coords.longitude ? props.coords.longitude : "common"
            }`}</CodeSnippet>
            {props.coords.altitude ? (
              <CodeSnippet>
                {`altitude:  ${props.coords.altitude} m.`}
              </CodeSnippet>
            ) : null}
          </div>
        ) : null}
        {!!props.positionError && (
          <div>
            <br />
            Last position error:
            <pre>{JSON.stringify(props.positionError)}</pre>
          </div>
        )}
      </div>
    );
  }
}

GeoLocate.propTypes = { ...GeoLocate.propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: true,
  userDecisionTimeout: null,
  suppressLocationOnMount: true,
  geolocationProvider: navigator.geolocation
})(GeoLocate);



// <Typo>Getting the location data&hellip;</Typo>