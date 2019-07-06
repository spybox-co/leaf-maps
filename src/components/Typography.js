import React from "react";
// import * as CarbonType from "@carbon/type";

export default ({ children, kind }) => {
  const style = {
    fontFamily: "IBM Plex Sans",
    marginBottom: 14
  };
  const Component = kind === "span" ? "span" : "p";
  return (
    <Component className="bx--type-mono bx--type-light" style={style}>
      {children}
    </Component>
  );
};