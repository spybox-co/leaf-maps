import Main from 'src/components/Shell/Main';

import 'styles/globals.scss'

function App({ Component, pageProps }) {
  return (
    <div className="lf--core">
      <Main>
        <Component {...pageProps} />
      </Main>
    </div>
  )
}

export default App
