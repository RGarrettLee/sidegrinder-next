import Navbar from '../components/navbar';
import supabase from '../db/connection';

export default function Portfolio() {
    return (
        <>
            <div className="flex justify-center py-15">
                <h1 className="text-center text-2xl">My Portfolio</h1>
            </div>
        </>
    )
}