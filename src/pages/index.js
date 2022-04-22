import Head from 'next/head';
import { useEffect, useContext } from 'react';
import { store } from 'store';


import Map from 'components/Map';



// import styles from 'styles/Home.module.scss';


export default function Home({ data }) {
  const { state, dispatch } = useContext(store);

  const { viewport } = state;

  useEffect(
    () => {
      dispatch({ type: 'set initial position', value: [data.latitude, data.longitude] })
      console.log(state)
    }, [data]
  );
  return (
    <>
      <Head>
        <title>SPYBOX | Leaf Maps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map center={viewport.center} zoom={viewport.zoom} />



    </>
  )
}
