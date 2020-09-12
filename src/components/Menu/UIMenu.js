import React, { useContext, useState } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';



import UIMenuNavigator, { TabButton } from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

import TabContainer, { TabHeader, Maps, Layers } from './Tabs'

import * as update from "../../version";

import styles from './Menu.module.scss'

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const tabs = [
  {
    name: "Maps",
    component: <Maps />
  },
  {
    name: "Layers",
    component: <Layers />
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

  console.log("Tab ys aktiw:", activeTab);



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