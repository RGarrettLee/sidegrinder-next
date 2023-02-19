import { useEffect } from 'react';
import supabase from '../db/connection';

export default function Login() {
    useEffect(() => {
        async function login() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'discord',
            })
        }

        login();
    }, [])

    return (
        <div>
            <h2 className="text-center text-2xl">logging in...</h2>
        </div>
    )
}

export async function getServerSideProps() {
    return {
      props: {}
    }
  }