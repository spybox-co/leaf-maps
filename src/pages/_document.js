import { Html, Head, Main, NextScript } from 'next/document'

const APP_NAME = 'Leaf Maps'
const APP_DESCRIPTION = 'Next on-line maps combo by SPYBOX'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name='application-name' content={APP_NAME} />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content={APP_NAME} />
        <meta name='description' content={APP_DESCRIPTION} />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#161616' />
        {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
        {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}
          
        {/* <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' /> */}

        <link rel='manifest' href='/manifest.json' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}