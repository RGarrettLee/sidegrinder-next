import '../styles/globals.css'
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import { useEffect, useState } from 'react';
import supabase from '../db/connection';

function MyApp({ Component, pageProps }) {

  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      let auth = {};
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          auth = value.data.user;
          console.log(auth);
        }
      })

      if (auth !== {}) {
        await supabase.from('profiles').select('id, full_name, avatar_url, admin')
          .then((result) => {
            result.data.map((user) => {
              if (user.id === auth.id) {
                setUser(user);
              } 
            }) 
          })
      }
    }

    getUser();
  }, []);

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Garrett Lee</title>
        <meta charSet='UTF-8' />
        <meta name='description' content='A portfolio page and platform for hosting various web-apps by Garrett Lee'/>
        <meta name='author' content='Garrett Lee' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='keywords' content='Garrett, Lee, Garrett Lee, Resume, Portfolio, Full-Stack, Developer' />
        <meta name='og:image' content='' />
      </Head>
      <Navbar user={user}></Navbar>
      <Component {...pageProps} user={user} />
      <Footer />
    </div>
  )
}

export default MyApp
