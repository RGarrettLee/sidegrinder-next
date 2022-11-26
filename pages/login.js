import { useEffect } from 'react';
import supabase from '../db/connection';

export default function login() {
    async function login() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'discord',
        })
    }

    useEffect(() => {
        login();
    }, [])

    return (
        <></>
    )
}