import '../styles/globals.css'
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sidegrinder.APP</title>
      </Head>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
