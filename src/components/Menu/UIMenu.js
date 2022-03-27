import React, { useContext, useState } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

import UIMenuNavigator from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

// import Console from '../../components/Console';

import TabContainer, { TabHeader, TabButton, Maps, Layers, Console } from './Tabs'

import * as update from "../../version";

import styles from './Menu.module.scss'

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const tabs = [
  {
    name: "Maps",
    component: <Maps />,
    icon: "Map"
  },
  {
    name: "Layers",
    component: <Layers />,
    icon: "LayerStack"
  },
  {
    name: "Console",
    component: <Console />,
    icon: "Settings"
  }
];

const UIMenu = props => {
  const { dispatch } = useContext(store);


  // ToDo: set from global state!
  const [activeTab, setActiveTab] = useState(tabs[0])
  const {
    expanded,
  } = props;

  // const { maps } = state;


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
          <li className="Tab" key={i}>
            <TabButton
              onClick={() => actionTabClick(tab)} 
              renderIcon={tab.icon}
              active={tab.name === activeTab.name && expanded ? true : false}
            />
          </li>
          ))}
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
