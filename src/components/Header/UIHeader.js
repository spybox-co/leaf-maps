import React, { Component } from "react";

import Hamburger from "../IconButton";

import * as update from "../../version";
// eslint-disable-next-line
import Button from "../IconButton";

import LocateButton from './LocateButton';
import UIMenu from "../Menu/UIMenu";

import {
  // Content,
  Header,
  // HeaderMenuButton,
  HeaderName
  // HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  // HeaderGlobalBar,
  // HeaderGlobalAction
  // HeaderPanel,
  // SkipToContent,
  // SideNav,
  //Temporarily comment these out until they are needed again
  // SideNavHeader,
  // SideNavDetails,
  // SideNavSwitcher,
  // SideNavItems,
  // SideNavLink,
  // SideNavMenu,
  // SideNavMenuItem,
  // Switcher,
  // SwitcherItem,
  // SwitcherItemLink
} from "carbon-components-react/lib/components/UIShell";

// import Add from '@carbon/icons-react/es/add--filled/16';

export default class UIHeader extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    };
    this.actionMenuHandle = this.actionMenuHandle.bind(this);
  }

  actionMenuHandle = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
    //this.setState({ expanded: false })
  };

  render() {
    const { changeMap, BaseMapsData, selectedMap } = this.props;
    const { actionMenuHandle } = this;
    const { expanded } = this.state;

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
          <Version />
          <LocateButton />
        </Common>

        <UIMenu
          expanded={expanded}
          actionMenuHandle={actionMenuHandle}
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}
          selectedMap={selectedMap}
        />
      </Header>
    );
  }
}

const Common = props => {
  const style = {
    display: `inline-flex`,
    justifyContent: `flex-end`,
    flex: `1 1 0%`
  };

  return <div style={style}>{props.children}</div>;
};

const Version = () => {
  return(
    <div style={{ display: `flex`, alignItems: `center`}}>      
      <small style={{ color: update.app.color, padding: `0 1rem` }}>ver. {update.app.version}</small>
    </div>
  )
}

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
