import '../styles/globals.css'
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { useEffect, useState } from 'react';
import supabase from '../db/connection';

// pass in user here to have it carry through all pages and use it finally for stuff?
// pass into navbar as a prop

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({});

  useEffect(() => {
      async function getUser() {
          await supabase.auth.getUser().then((value) => {
              if (value.data?.user) {
                  setUser(value.data.user);
              } else {
                  setUser({});
              }
          })
      }
      getUser();
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Garrett Lee</title>
      </Head>
      <Navbar user={user}></Navbar>
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
