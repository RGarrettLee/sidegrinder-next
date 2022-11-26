import { useEffect } from 'react';
import { useRouter } from 'next/router';
import supabase from "../db/connection";

export default function logout() {
    const router = useRouter();

    async function signout() {
        const { error } = await supabase.auth.signOut()
        router.reload(window.location.pathname);
    }

      useEffect(() => {
        signout();
      }, [])

      return (
        <>
            <h1 className="text-center text-2xl">logging out...</h1>
        </>
      )
}