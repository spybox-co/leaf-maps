import Head from 'next/head';

import Map from 'src/components/Map';



import styles from 'styles/Home.module.scss';

const DEFAULT_CENTER = [38.907132, -77.036546]

export default function Home() {
  return (
    <>
      <Head>
        <title>SPYBOX | Leaf Maps</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Map className={styles.homeMap} center={DEFAULT_CENTER} zoom={12} />



    </>
  )
}
