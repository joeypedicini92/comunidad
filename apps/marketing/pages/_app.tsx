import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from './header';
import './styles.css';
import * as LogRocket from 'logrocket';
LogRocket.init('k0mgyc/comunidaddies');

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Find Your Comunidad</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-236221704-1"
        ></script>
        <script
          async
          type="module"
          src="https://cdn.jsdelivr.net/npm/@pwabuilder/pwainstall"
        ></script>
      </Head>
      <main className="app">
        <Header></Header>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
