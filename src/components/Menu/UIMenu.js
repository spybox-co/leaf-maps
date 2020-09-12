import React, { useContext } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

import Link from './Link/UILink';

import UIMenuNavigator, { TabButton } from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

import TabContainer, { TabHeader } from './Tabs'

import * as update from "../../version";

// import { SideNav } from "carbon-components-react/lib/components/UIShell";

import styles from './Menu.module.scss'

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const tabs = [
  {
    name: "Maps",
    content: ""
  }
]

const UIMenu = props => {
  const { state, dispatch } = useContext(store);
  const {
    actionMenuHandle,
    changeMap,
    BaseMapsData,
    selectedMap
  } = props;

  return (
    <UISideNavigation
      isFixedNav
      // expanded={true}
      expanded={props.expanded}
      isChildOfHeader={true}
      aria-label="Side navigation"
    >
      <UIMenuNavigator />
      
        
      <UIMenuTabContainer 
        title="Maps"
        expanded={props.expanded}
      >
          {BaseMapsData.length !== 0
            && BaseMapsData.map((map, i) => (
                <Link
                  key={i}
                  active={selectedMap.url === map.url ? true : false}
                  label={map.vendor}
                  title={map.name}
                  map={!map.apikey ? map.url : `${map.url}${map.apikey}`}
                  center={state.viewport.center}
                  zoom={state.viewport.zoom}
                  option={map.default ? "Default" : null}
                  description={map.desc ? map.desc : null}
                  onClick={event => {
                    actionMenuHandle();
                    dispatch({ type: 'change map', value: i });
                    changeMap(
                      map.vendor,
                      map.name,
                      map.url,
                      map.maxZoom,
                      map.apikey,
                      i
                    );
                    event.preventDefault();
                  }}
                />
              ))}
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