import React, { useContext } from "react";
import { store } from '../../store.js';

import { cn } from '../../utils/helpers';

// eslint-disable-next-line
import { Button, IconButton } from "../Button";

import LocateButton from './LocateButton';
import UIMenu from "../Menu/UIMenu";

import {
  Header,
  HeaderName
} from "carbon-components-react/lib/components/UIShell";

import styles from './UIHeader.module.scss';
import './Header.scss';

const UIHeader = () => {
  const { state, dispatch } = useContext(store);

  const actionMenuHandle = () => {
    dispatch({ type: 'toggle menu'})
  };


  const { expanded, compactMode } = state;

  return (
    <Header aria-label="Leaf Maps by Spybox.co">

      {!compactMode ? (
        <LogoLeafMaps fill={expanded}/>
      ) : (
        <IconButton
          id="hamburger"
          kind={"secondary"}
          renderIcon={expanded ? Close16 : Menu16}
          iconDescription="Menu"
          onClick={actionMenuHandle}
        />
      )}
      
      {/* <Hamburger
        id="hamburger"
        kind={"secondary"}
        renderIcon={expanded ? Close16 : Menu16}
        iconDescription="Menu"
        onClick={actionMenuHandle}
      /> */}

      <HeaderName href="./" prefix="SPYBOX">
      {/* <HeaderName href="./" prefix={<SPYBOXtypo/>}> */}
        Leaf Maps
      </HeaderName>


      <Common>
        {/* <Button kind="primary">Sample button</Button>
        <Button>Sample button</Button> */}
        <LocateButton />
      </Common>

      <UIMenu
        expanded={expanded}
        actionMenuHandle={actionMenuHandle}
      />
    </Header>
  );
}
export default UIHeader;

const Common = props => {
  const style = {
    display: `inline-flex`,
    justifyContent: `flex-end`,
    flex: `1 1 0%`
  };

  return <div style={style}>{props.children}</div>;
};

const LogoLeafMaps = ({ fill }) => (
  <div className={cn(styles.logo, 'Logo', 'Leafmaps', fill && 'filled')}>
    <svg viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* <path d="M326 199.613V119.613L256 80L186 119.613V199.613L116.5 160L47 199.613V280.584L116.5 321L116.61 320.936L117 321.161V400.584L186.5 441L255.641 400.793L256 401L256.359 400.793L325.5 441L395 400.584V321.165L395.392 320.937L395.5 321L465 280.584V199.613L395.5 160L326 199.613Z" /> */}
      
      <path d="M117 400.584L186.5 441L256 400.584V319.613L186.5 280L117 319.613V400.584Z" />
      <path d="M116 320.584L186 361L256 320.584V239.613L186 200L116 239.613V320.584Z" />
      <path d="M47 280.584L116.5 321L186 280.584V199.613L116.5 160L47 199.613V280.584Z" />
      <path d="M256 400.584L325.5 441L395 400.584V319.613L325.5 280L256 319.613V400.584Z" />
      <path d="M257 320.584L326.5 361L396 320.584V239.613L326.5 200L257 239.613V320.584Z" />
      <path d="M326 280.584L395.5 321L465 280.584V199.613L395.5 160L326 199.613V280.584Z" />
      <path d="M186 200.584L256 241L326 200.584V119.613L256 80L186 119.613V200.584Z" />
      <path d="M186 280.584L256 321L326 280.584V199.613L256 160L186 199.613V280.584Z" />
      <path d="M186 360.584L256 401L326 360.584V279.613L256 240L186 279.613V360.584Z" />


    </svg>
  </div>
)

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


const SPYBOXtypo = () => (
  <svg width="97" height="16" viewBox="0 0 970 160" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M577.2 40V120L646.4 160L715.7 120V39.9L646.4 0L577.2 40ZM692.6 106.6L646.4 133.3L600.3 106.6V53.3L646.5 26.6L692.7 53.2L692.6 106.6Z" />
    <path d="M900.4 93.3L877.3 80L784.9 133.3V160L877.3 106.6L969.6 160V133.3L900.4 93.3Z" />
    <path d="M877.3 79.8L969.6 26.5V0L877.3 53.2L784.9 0L785 26.7L877.3 79.8Z" />
    <path d="M46.2 26.7L92.4 53.3V26.7L69.3 13.3L46.2 0L0 26.7V53.3L46.2 26.7Z" />
    <path d="M461.8 0L438.6 13.3L484.8 40V66.7L507.9 80V26.7L461.8 0Z" />
    <path d="M184.7 0L161.6 13.3L207.8 40V66.7L230.9 80V26.7L184.7 0Z" />
    <path d="M438.7 66.6L415.6 80L484.8 120V146.6L507.9 160V106.6L438.7 66.6Z" />
    <path d="M23.1 66.6L0 80L69.3 120V146.6L92.4 160V106.6L23.1 66.6Z" />
    <path d="M138.5 80V160L161.6 146.6V13.3L138.5 26.7V80Z" />
    <path d="M277.1 106.6V160L300.1 146.6V93.3L277.1 106.6Z" />
    <path d="M346.3 13.3V66.6L369.4 53.3V0L346.3 13.3Z" />
  </svg>
)