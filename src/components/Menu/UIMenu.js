import React, { useContext } from "react";
import { store } from '../../store.js';
import Link from "../Link/UILink";

import { SideNav } from "carbon-components-react/lib/components/UIShell";

import ScrollableArea from "../ScrollableArea/ScrollableArea";

//https://stackoverflow.com/questions/42297728/react-js-implement-menu-highlight-active-link

const UIMenu = props => {
  const { dispatch } = useContext(store);
  const {
    actionMenuHandle,
    changeMap,
    BaseMapsData,
    selectedMap
  } = props;

  return (
    <SideNav
      isFixedNav
      expanded={props.expanded}
      isChildOfHeader={true}
      aria-label="Side navigation"
    >
      <ScrollableArea area={{ width: `100%`, height: `100%` }}>
        <div
          style={{
            padding: `1rem 0 3rem`,
            display: `flex`,
            flexDirection: `column`,
            flexGrow: 1
            //marginLeft: 48
          }}
        >
          <h6
            style={{
              padding: `1rem 0 1rem 1rem`
            }}
          >
            Maps
          </h6>
          {BaseMapsData.length !== 0
            ? BaseMapsData.map((map, i) => (
                <Link
                  key={i}
                  active={selectedMap.url === map.url ? true : false}
                  label={map.vendor}
                  title={map.name}
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
              ))
            : null}
        </div>
      </ScrollableArea>
    </SideNav>
  );
}
export default UIMenu;

// eslint-disable-next-line
const Fade16 = () => (
  <svg
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M8.24 25.14L7 26.67a14 14 0 0 0 4.18 2.44l.68-1.88a12 12 0 0 1-3.62-2.09zm-4.05-7.07l-2 .35A13.89 13.89 0 0 0 3.86 23l1.73-1a11.9 11.9 0 0 1-1.4-3.93zm7.63-13.31l-.68-1.88A14 14 0 0 0 7 5.33l1.24 1.53a12 12 0 0 1 3.58-2.1zM5.59 10L3.86 9a13.89 13.89 0 0 0-1.64 4.54l2 .35A11.9 11.9 0 0 1 5.59 10zM16 2v2a12 12 0 0 1 0 24v2a14 14 0 0 0 0-28z" />
  </svg>
);
