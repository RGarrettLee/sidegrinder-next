import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../db/connection';

export default function PushupLeaderboard({ user }) {
   const { id, full_name } = user;
   const [players, setPlayers] = useState([]);
   const [player, setPlayer] = useState({});
   const [count, setCount] = useState(0);
   const [added, setAdded] = useState(false);
   const router = useRouter();

   useEffect(() => {
      async function getPushups() {
         await supabase.from('pushups').select('name, pushups')
            .then((result) => {
               result['data'].map((user) => {
                  if (full_name === user.name) {
                     setPlayer(user);
                     setAdded(true);
                  }
               })

               result['data'].sort((a, b) => {
                  return b.pushups - a.pushups;
               });

               setPlayers([...result['data']]);
            })
      }

      getPushups();
   }, [full_name, added]);

   async function joinLeaderboard() {
      const { error } = await supabase.from('pushups').insert({ name: full_name, pushups: 0, uid: id })
      router.reload(window.location.pathname);
   }

   async function updateLeaderboard() {
      let newPushups = parseInt(player.pushups) + parseInt(count);
      if (Number.isInteger(newPushups)) {
         const { error } = await supabase.from('pushups').update({ pushups: newPushups }).eq('name', full_name);
      } else {
         console.log('OK BUDDY');
      }

      router.reload(window.location.pathname);
   }

   function updateCount(event) {
      setCount(event.target.value);
   }

   return (
      <div className='flex flex-col items-center'>
         <h2 className='text-2xl'>Pushups Leaderboard</h2>
         <p className='text-md font-light'>See who sucks at the Brawlhalla, but has done a lot of pushups</p>

         {added ? (
            <div className='flex flex-col items-center mt-8'>
               <h2>Did some pushups? Add them up</h2>
               <div className='flex gap-4'>
                  <input onChange={updateCount} className='text-center rounded-lg' type='number' placeholder='Enter # of pushups'></input>
                  <button onClick={updateLeaderboard} className='bg-green-800 hover:bg-green-600 active:bg-green-400 px-4 py-1 rounded-lg duration-150 transition-all'>Add Pushups</button>
               </div>
            </div>
         ) : (
            <></>
         )}

         <table className='table-fixed border-separate bg-gray-900 w-3/4 mt-3'>
            <thead className='border-b border-slate-600'>
               <tr>
                  <th>Name</th>
                  <th>Pushups Done</th>
               </tr>
            </thead>
            <tbody className='bg-gray-800 text-center'>
               {players.map((player, id) => (
                  <tr className='font-light' key={id}>
                     <td>{player.name}</td>
                     <td>{player.pushups}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         {!added ? (
            <div className='flex flex-col items-center mt-4'>
               <h2 className='font-bold text-lg'>Participating in the games and want to track it?</h2>
               <button onClick={joinLeaderboard} className='block mt-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Join</button>
            </div>
         ) : (
            <>
            </>
         )}
      </div>
   )
}