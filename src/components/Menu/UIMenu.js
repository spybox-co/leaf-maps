import React, { useContext, useState } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';


import { LayerStack, Map } from '../Icon/Library';



import UIMenuNavigator from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

import TabContainer, { TabHeader, TabButton, Maps, Layers } from './Tabs'

import * as update from "../../version";

import styles from './Menu.module.scss'

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const tabs = [
  {
    name: "Maps",
    component: <Maps />,
    icon: Map
    // icon: "<Globe32 />" // Globe
  },
  {
    name: "Layers",
    component: <Layers />,
    icon: LayerStack
    // icon: "<SubVolume32 />" // sub-volume
  }
];

const UIMenu = props => {
  const { state, dispatch } = useContext(store);
  const [activeTab, setActiveTab] = useState(tabs[0])
  const {
    expanded,
    actionMenuHandle,
  } = props;

  const { maps } = state;

  // console.log("Tab ys aktiw:", activeTab);



  const actionTabClick = tab => {
    if (!expanded) dispatch({ type: 'open menu'});
    if (expanded && activeTab.name === tab.name)  dispatch({ type: 'close menu'})
    if (activeTab.name !== tab.name) setActiveTab(tab);
  }

  return (
    <UISideNavigation
      // isFixedNav
      expanded={expanded}
      // isChildOfHeader={true}
      aria-label="Side navigation"
    >
      <UIMenuNavigator>
        {tabs.map((tab, i) => (
          <TabButton 
            key={i} 
            onClick={() => actionTabClick(tab)} 
            icon={tab.icon}
            active={tab.name === activeTab.name && expanded ? true : false}
          />))}
      </UIMenuNavigator>
      
        
      <UIMenuTabContainer 
        title={activeTab.name}
        expanded={expanded}
      >
        {activeTab.component}
      </UIMenuTabContainer>
      
    </UISideNavigation>
  );
}
export default UIMenu;

const UIMenuTabContainer = ({ children, title }) => {
  const classes = cn(styles.NavigationContent, "navigation-content")
  return(
    <div className={classes}>
      <TabHeader title={title} />
      <TabContainer>
        {children}
      </TabContainer>
      <Version />
    </div>
  )
}


const Version = () => {
  return(
    <div style={{ 
      display: `flex`, 
      bottom: `6.75rem`,
      height: `3rem`,
      width: `16rem`,
      left: `-6.5rem`,
      position: `absolute`, 
      alignItems: `center`,
      transform: `rotate(-90deg)`
    }}>
      <small style={{ color: update.app.color, padding: `0 1rem` }}>
        {update.app.version && <span>ver. {update.app.version}</span>}
        {update.app.variant && <span style={{ marginLeft: `0.75rem` }}>variant: {update.app.variant}</span>}
      </small>
    </div>
  )
}


// eslint-disable-next-line
const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);