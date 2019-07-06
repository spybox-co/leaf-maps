import React, { Component } from "react";
import IconButton from "../IconButton";
// eslint-disable-next-line
import UIShell, {
  // Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  // HeaderNavigation,
  // HeaderMenu,
  // HeaderMenuItem,
  // HeaderGlobalBar,
  // HeaderGlobalAction,
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
} from "carbon-components-react";
import '../../carbon.css';

import Add from '@carbon/icons-react/es/add--filled/16';

export default class UIHeader extends Component {
  
  render() {
    // eslint-disable-next-line
    const { GetLocation, ChangeMap } = this.props;

    return (
      <Header href="#" aria-label="Leaf Maps by Spybox.co">
        <HeaderMenuButton
          aria-label="Open menu"
          //onClick={action("Menu clicked")}
        />
        <HeaderName prefix="Spybox">Leaf Maps</HeaderName>
        <IconButton 
            kind="secondary" 
            renderIcon={Add}
            iconDescription="Menu"
            onClick={GetLocation}
        />
        <Common>
          {this.props.children}
        </Common>
      </Header>
    );
  }
}


const Common = props => {
  return <div>{props.children}</div>
}