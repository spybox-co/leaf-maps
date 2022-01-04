import React from "react";

import "./Footer.scss";

export const UIFooter = props => {
  return (
  <footer className="lm-Footer">
    {props.children}
  </footer>
  );
};

