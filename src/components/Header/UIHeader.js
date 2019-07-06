import React, { Component } from "react";

import Hamburger from "../IconButton";
// eslint-disable-next-line
import Button from "../IconButton";

import UIMenu from "../Menu/UIMenu";

import {
  // Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  // HeaderNavigation,
  HeaderMenu,
  // HeaderMenuItem,
  // HeaderGlobalBar,
  HeaderGlobalAction,
  // HeaderPanel,
  // SkipToContent,
  // SideNav,
  // Temporarily comment these out until they are needed again
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
} from 'carbon-components-react/lib/components/UIShell';

// import Add from '@carbon/icons-react/es/add--filled/16';

export default class UIHeader extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false,
    }
    this.actionMenuHandle = this.actionMenuHandle.bind(this);
  }

  actionMenuHandle = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
    //this.setState({ expanded: false })

  }
  
  render() {
    const { changeMap, BaseMapsData } = this.props;
    const { actionMenuHandle } = this;
    const { expanded } = this.state;

    return (
      <Header href="#" aria-label="Leaf Maps by Spybox.co">
        {/* <HeaderMenuButton
          aria-label="Open menu"
          //onClick={action("Menu clicked")}
        /> */}

        <Hamburger 
          // kind={expanded ? "danger" : "secondary"} 
          kind={"secondary"} 
          renderIcon={expanded ? Close16 : Menu16}
          iconDescription="Menu"
          onClick={actionMenuHandle}
        />

        <HeaderName prefix="SPYBOX">Leaf Maps</HeaderName>

        <Common>
          {this.props.children}
        </Common>


        {/* <HeaderGlobalAction
            aria-label="App Switcher"
            //onClick={action('app-switcher click')}
        >
          <Menu16 />
        </HeaderGlobalAction> */}


        {/* <HeaderMenu /> */}

        <UIMenu 
          expanded={expanded} 
          actionMenuHandle={actionMenuHandle}
          changeMap={changeMap}
          BaseMapsData={BaseMapsData}          
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
  }

  return <div style={style}>{props.children}</div>
}


const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    style={{ fill: `currentColor` }}
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);

const Menu16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-hidden="true"
    style={{ fill: `#fff` }}
  >
    <rect x="2" y="12" width="12" height="1"/>
    <rect x="2" y="9" width="12" height="1"/>
    <rect x="2" y="6" width="12" height="1"/>
    <rect x="2" y="3" width="12" height="1"/>
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
    <polygon class="st0" points="12,4.7 11.3,4 8,7.3 4.7,4 4,4.7 7.3,8 4,11.3 4.7,12 8,8.7 11.3,12 12,11.3 8.7,8 "/>
  </svg>
);