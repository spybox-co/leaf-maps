import { StateProvider } from 'store';

import Main from 'components/Shell/Main';

import 'styles/globals.scss'

export default function App({ Component, pageProps }) {

  return (
    <StateProvider>
      <div className="lf--core">
        <Main>
          <Component {...pageProps} />
        </Main>
      </div>
    </StateProvider>
  )
}


