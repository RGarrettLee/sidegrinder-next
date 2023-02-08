import { useEffect, useState} from 'react';
import supabase from '../db/connection';

/*

FLOW OF THE PAGE
- present users with a button to create new evo line to follow
- name digimon / ask for number of egg reverts
- create dropdown menu for each "fresh" digimon
   - when chosen fresh create menu for all possible evolutions of it and so on for each after in-training -> rookie -> champion -> ultimate -> mega
- display evolution requirements for each stage with tracking
   - ex. 50 Virus AP [ 0 ] + [ number input ] 
- add "Next Stage" button for when the digimon is onto the next stage

*/

export default function DWCTracker() {
   const [digimon, setDigimon] = useState([]);

   useEffect(() => {})

   function newDigimon() {
      console.log('generating new digimon...');
      let nd = digimon;
      setDigimon(nd);
      console.log(digimon);
   }

   return (
      <>
         <div className='flex justify-center align-center flex-col'>
            <h1 className='text-center text-2xl'>Digimon World Championship Tracker</h1>
            <button onClick={newDigimon} className='block mx-auto mt-4 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>New Digimon</button>
            <p className='text-center mt-5 font-thin text-xl'>WIP</p>
         </div>
      </>
   )
}