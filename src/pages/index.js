import Head from 'next/head';
import { useState, useEffect, useContext } from 'react';
import { store } from 'store';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


import Mapbox from 'components/Mapbox';
// import Map from 'components/Map';



// import styles from 'styles/Home.module.scss';


export default function Home({ data }) {
  const { state, dispatch } = useContext(store);
  useEffect(
    () => {
      dispatch({ type: 'set initial position', value: [data.latitude || 51, data.longitude || 0] })
      console.log(state)
    }, [data]
  );
  const { viewport } = state;

  console.log(data)

  return (
    <>
      <Head>
        <title>SPYBOX | Leaf Maps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Mapbox data={data} />
    
      {/* <Mapbox 
        center={viewport.center || [51,0]} 
        zoom={viewport.zoom} 
      /> */}



    </>
  )
}

// Opt-out of Automatic Static Optimization
// https://nextjs.org/docs/messages/opt-out-auto-static-optimization

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://www.geolocation-db.com/json/')
  const json = await res.json()
  return { data: json }
}