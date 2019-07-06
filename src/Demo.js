import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";

import Typo from "./components/Typography";

import { CodeSnippet } from "carbon-components-react";

// const getDirection = (degrees, isLongitude) =>
//   degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// // addapted from http://stackoverflow.com/a/5786281/2546338
// const formatDegrees = (degrees, isLongitude) =>
//   `${0 | degrees}° ${0 |
//     (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)}' ${0 |
//     (((degrees * 60) % 1) * 60)}" ${getDirection(degrees, isLongitude)}`;

class Demo extends React.Component {
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
            <CodeSnippet>{`latitude:  ${props.coords.latitude ? props.coords.latitude : "common"}`}</CodeSnippet>
            <CodeSnippet>{`longitude: ${props.coords.longitude ? props.coords.longitude : "common"}`}</CodeSnippet>
            {props.coords.altitude ? (
              <CodeSnippet>
                {`altitude:  ${props.coords.altitude} m.`}
              </CodeSnippet>
            ) : null}
          </div>
        ) : (
          <Typo>Getting the location data&hellip;</Typo>
        )}
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

Demo.propTypes = { ...Demo.propTypes, ...geoPropTypes };

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
})(Demo);
