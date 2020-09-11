import React, { useContext } from 'react';
import { store } from '../../store.js';
import { cn } from '../../utils/helpers';

import Link from './Link/UILink';

import UIMenuNavigator, { TabButton } from './UIMenuTabNavigator';
import UISideNavigation from './UISideNavigation';

import TabContainer, { TabHeader } from './Tabs'

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
      // expanded={props.expanded}
      isChildOfHeader={true}
      aria-label="Side navigation"
    >
      <UIMenuNavigator />
      
        
      <UIMenuTabContainer title="Maps">
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

const UIMenuTabContainer = ({ children, title }) => (
  <div className={styles.NavigationContent}>
    <TabHeader title={title} />
    <TabContainer>
      {children}
    </TabContainer>
  </div>
)


