import { AppProps } from 'next/app';
import Head from 'next/head';
import Header from './header';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to our Comunidad</title>
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <main className="app">
        <Header></Header>
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
