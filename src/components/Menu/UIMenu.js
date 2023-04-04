import React, { useContext, useState } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

import UIMenuNavigator from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

// import Console from '../../components/Console';

import TabContainer, { TabHeader, Maps, Layers, Console, Bookmarks, Share } from './Tabs'
import { TabButton } from '../../components/TabButton';
import { Tag } from '../../components/Tag';
import * as update from '../../version';

import styles from './Menu.module.scss'

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const tabs = [
  {
    name: "Basemaps",
    component: <Maps />,
    icon: "Map"
  },
  {
    name: "Overlayers",
    component: <Layers />,
    icon: "LayerStack"
  },
  {
    name: "Bookmarks",
    component: <Bookmarks />,
    icon: "Bookmark",
    theme: "g10 theme-light"
  },
  {
    name: "Share",
    component: <Share />,
    icon: "Share",
    theme: "g10 theme-light"
  },
  {
    name: "Console",
    component: <Console />,
    icon: "Settings",
    theme: "g10 theme-light"
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
    if (expanded && activeTab.name === tab.name) { 
      dispatch({ type: 'close menu'}) 
      dispatch({ type: 'refresh map'}) 
    }
    if (activeTab.name !== tab.name) setActiveTab(tab);
  }

  return (
    <UISideNavigation
      // isFixedNav
      // isChildOfHeader={true}
      expanded={expanded}
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
        theme={activeTab.theme ? activeTab.theme : null}
      >
        {activeTab.component}
      </UIMenuTabContainer>
      
    </UISideNavigation>
  );
}
export default UIMenu;

const UIMenuTabContainer = ({ children, title, theme }) => {
  const classes = cn(styles.NavigationContent, "navigation-content")
  return(
    <div className={classes}>
      <TabHeader title={title} />
      <TabContainer theme={theme}>
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
      <Tag>Version</Tag>
      <Tag color={update.app.color}>{update.app.version}</Tag>
      <Tag type="blue">{update.app.variant}</Tag>
      {/* <small style={{ color: update.app.color, padding: `0 1rem` }}>
        {update.app.version && <span><sup>version</sup>{update.app.version}</span>}
        {update.app.variant && <span style={{ marginLeft: `0.75rem` }}><sup>variant</sup>{update.app.variant}</span>}
      </small> */}
    </div>
  )
}
