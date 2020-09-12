import React, { useContext } from "react";
import { store } from '../../store.js';
import Hamburger from "../IconButton";

// eslint-disable-next-line
import Button from "../IconButton";

import LocateButton from './LocateButton';
import UIMenu from "../Menu/UIMenu";

import {
  Header,
  HeaderName
} from "carbon-components-react/lib/components/UIShell";

const UIHeader = () => {
  const { state, dispatch } = useContext(store);

  const actionMenuHandle = () => {
    dispatch({ type: 'toggle menu'})
  };


  const { expanded } = state;

  return (
    <Header aria-label="Leaf Maps by Spybox.co">
      <Hamburger
        id="hamburger"
        kind={"secondary"}
        renderIcon={expanded ? Close16 : Menu16}
        iconDescription="Menu"
        onClick={actionMenuHandle}
      />

      <HeaderName href="./" prefix="SPYBOX">
        Leaf Maps
      </HeaderName>


      <Common>
        <LocateButton />
      </Common>

      <UIMenu
        expanded={expanded}
        actionMenuHandle={actionMenuHandle}
      />
    </Header>
  );
}
export default UIHeader;

const Common = props => {
  const style = {
    display: `inline-flex`,
    justifyContent: `flex-end`,
    flex: `1 1 0%`
  };

  return <div style={style}>{props.children}</div>;
};



const Menu16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    style={{ fill: `#fff` }}
  >
    <rect x="2" y="12" width="12" height="1" />
    <rect x="2" y="9" width="12" height="1" />
    <rect x="2" y="6" width="12" height="1" />
    <rect x="2" y="3" width="12" height="1" />
  </svg>
);
const Close16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    style={{ fill: `#fff` }}
  >
    <polygon points="12,4.7 11.3,4 8,7.3 4.7,4 4,4.7 7.3,8 4,11.3 4.7,12 8,8.7 11.3,12 12,11.3 8.7,8 " />
  </svg>
);
