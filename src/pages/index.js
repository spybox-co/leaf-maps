import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { store } from 'store';


import 'mapbox-gl/dist/mapbox-gl.css';


import Mapbox from 'components/Mapbox';



export default function Home({ data }) {
  const { state, dispatch } = useContext(store);

  // @DOCS - Shallow Routing
  // https://nextjs.org/docs/routing/shallow-routing
  // @Example
  // https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-shallow-routing?file=pages%2Findex.js

  useEffect(
    () => {
      if (data) {
        dispatch({ type: 'set initial position', value: [data.latitude, data.longitude] })
        console.log("Props", data)
      }
    }, [data]
  );
  useEffect(
    () => {
      console.log("State updated:", state)
    }, [state]
  );

  const router = useRouter()

  useEffect(() => {
    // Always do navigations after the first render
    router.push(`/?lat=${state.viewport.center[0]}&lng=${state.viewport.center[1]}&z=${state.viewport.zoom}`, undefined, { shallow: true })
  }, [state])

  useEffect(() => {
    // The counter changed!
  }, [router.query.counter])


  const { viewport } = state;

  console.log(data)

  return (
    <>
      <Head>
        <title>SPYBOX | Leaf Maps</title>
      </Head>

      <Mapbox data={data} />
    
    </>
  )
}

// Opt-out of Automatic Static Optimization
// https://nextjs.org/docs/messages/opt-out-auto-static-optimization

export async function getServerSideProps(context) {
  try {
    const res = await fetch('https://www.geolocation-db.com/json/')
    const results = await res.json()

    return { props: { data: results } }
  } catch (error) {

    console.error('runtime error: ', error);
    return { props: { data: { latitude: 51, longitude: 0 } } }
  }
}