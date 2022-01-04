import React from "react";

import { IconButton } from "../Button";
import Up from "@carbon/icons-react/es/up-to-top/16";
import Down from "@carbon/icons-react/es/down-to-bottom/16";

import ScrollableArea from "../ScrollableArea/ScrollableArea";

import "./ExpandablePanel.scss";


// @Sample
// https://pretagteam.com/question/expand-and-collapse-divs-in-react

export const ExpandablePanel = ({ expanded, children }) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);


  const classes = {
    root: ['lf-Panel', isExpanded ? 'expanded' : 'collapsed'].join(' ').trim();
  }

  return(
    <div
      className={`collapse-content ${isCollapsed ? 'collapsed' : 'expanded'}`}
      aria-expanded={isCollapsed}
    >  
      <button
        className="collapse-button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show' : 'Hide'} content
      </button>
      <div className="lf-Panel-container">
        <ScrollableArea area={{ width: `100%`, height: `100%` }}>
          {children}
        </ScrollableArea>
      </div>
      
    </div>
  );
}