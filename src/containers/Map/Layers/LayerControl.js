/**
 *
 * LayerControl
 * https://codesandbox.io/s/goofy-water-13hld?file=/src/LayerControl.js
 */

 import React, { useState } from "react";
 // import styled from 'styled-components';
//  import { Paper, Typography, IconButton } from "@material-ui/core";
 import { useMapEvents } from "react-leaflet";
 import { Util } from "leaflet";
//  import Accordion from "@material-ui/core/Accordion";
//  import FormControlLabel from "@material-ui/core/FormControlLabel";
//  import Checkbox from "@material-ui/core/Checkbox";
//  import AccordionSummary from "@material-ui/core/AccordionSummary";
//  import AccordionDetails from "@material-ui/core/AccordionDetails";
//  import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//  import LayersIcon from "@material-ui/icons/Layers";
 import lodashGroupBy from "lodash.groupby";
 import { LayersControlProvider } from "./layerControlContext";
 
 import createControlledLayer from "./controlledLayer";
 
 // Classes used by Leaflet to position controls
 const POSITION_CLASSES = {
   bottomleft: "leaflet-bottom leaflet-left",
   bottomright: "leaflet-bottom leaflet-right",
   topleft: "leaflet-top leaflet-left",
   topright: "leaflet-top leaflet-right"
 };
 
 function LayerControl({ position, children }) {
   const [collapsed, setCollapsed] = useState(true);
   const [layers, setLayers] = useState([]);
   const positionClass =
     (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
 
   const map = useMapEvents({
     layerremove: () => {
       // console.log("layer removed");
     },
     layeradd: () => {
       // console.log("layer add");
     },
     overlayadd: (layer, extra) => {
       // console.log(layer, extra);
     }
   });
 
   const onLayerClick = layerObj => {
     if (map?.hasLayer(layerObj.layer)) {
       map.removeLayer(layerObj.layer);
       setLayers(
         layers.map(layer => {
           if (layer.id === layerObj.id)
             return {
               ...layer,
               checked: false
             };
           return layer;
         })
       );
     } else {
       map.addLayer(layerObj.layer);
       setLayers(
         layers.map(layer => {
           if (layer.id === layerObj.id)
             return {
               ...layer,
               checked: true
             };
           return layer;
         })
       );
     }
   };
 
   const onGroupAdd = (layer, name, group) => {
     setLayers(_layers => [
       ..._layers,
       {
         layer,
         group,
         name,
         checked: map?.hasLayer(layer),
         id: Util.stamp(layer)
       }
     ]);
   };
 
   const groupedLayers = lodashGroupBy(layers, "group");
 
   // console.log(groupedLayers, "groupedLayers");
   return (
     <LayersControlProvider
       value={{
         layers,
         addGroup: onGroupAdd
       }}
     >
       <div className={positionClass}>
         <div className="leaflet-control leaflet-bar">
           fgh
           {/*
             <Paper
               onMouseEnter={() => setCollapsed(false)}
               onMouseLeave={() => setCollapsed(true)}
               // className={classes.container}
             >
               {collapsed && (
                 <IconButton>
                   <LayersIcon fontSize="default" />
                 </IconButton>
               )}
               {!collapsed &&
                 Object.keys(groupedLayers).map((section, index) => (
                   <Accordion key={`${section} ${index}`}>
                     <AccordionSummary
                       expandIcon={<ExpandMoreIcon />}
                       aria-controls="panel1a-content"
                       id="panel1a-header"
                     >
                       <Typography>{section}</Typography>
                     </AccordionSummary>
                     {groupedLayers[section]?.map(layerObj => (
                       <AccordionDetails>
                         <FormControlLabel
                           control={
                             <Checkbox
                               checked={layerObj.checked}
                               onChange={() => onLayerClick(layerObj)}
                               name="checkedB"
                               color="primary"
                             />
                           }
                           label={layerObj.name}
                         />
                       </AccordionDetails>
                     ))}
                   </Accordion>
                 ))}
             </Paper>
            */}
         </div>
         {children}
       </div>
     </LayersControlProvider>
   );
 }
 
 const GroupedLayer = createControlledLayer(function addGroup(
   layersControl,
   layer,
   name,
   group
 ) {
   layersControl.addGroup(layer, name, group);
 });
 
 export default LayerControl;
 export { GroupedLayer };
 