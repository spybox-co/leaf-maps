import { StateProvider } from 'store';
import { useEffect, useContext } from 'react';
// import { locationAPI } from 'utils/helpers';

import Main from 'components/Shell/Main';

import 'styles/globals.scss'

function App({ Component, pageProps, data }) {
  console.log(data)

  return (
    <StateProvider>
      <div className="lf--core">
        <Main>
          <Component {...pageProps} data={data} />
        </Main>
      </div>
    </StateProvider>
  )
}

App.getInitialProps = async (ctx) => {
  const res = await fetch('https://www.geolocation-db.com/json/')
  const json = await res.json()
  return { data: json }
}

export default App
