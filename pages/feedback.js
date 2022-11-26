import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';

export default function Feedback() {
    const [feedback, setFeedback] = useState('');

    async function onSubmit(e) { // send to webhook somehow?
        e.preventDefault();
        fetch(process.env.NEXT_PUBLIC_DISCORD_WEBHOOK, {
            method: 'POST',
            body: JSON.stringify({ 'content': feedback }),
            headers: { 'Content-Type': 'application/json' }
        });
        alert('Your feedback has been submitted');
    }

    function updateFeedback(e) {
        setFeedback(e.target.value);
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex justify-center align-center py-15 flex-col">
                <h1 className="text-3xl font-bold text-center">Help us improve</h1>
            </div>
            <div className="flex mx-auto items-center justify-center shadow-lg py-10 mb-4 max-w-lg">
                <form onSubmit={onSubmit} className="w-full max-w-xl bg-black rounded-lg px-4 pt-2">
                    <h2 className="px-4 pt-3 text-white text-lg">Leave some feedback</h2>
                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea className="bg-black rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-white focus:outline-none" placeholder="Type something..." name="feedback" required value={feedback} onChange={updateFeedback}></textarea>
                    </div>
                    <div className="mb-5 pl-3">
                        <input className="bg-black text-white font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-500" value="Post Feedback" type="submit"></input>
                    </div>
                </form>
            </div>
        </div>
    )
}