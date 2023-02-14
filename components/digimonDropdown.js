import { useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import supabase from '../db/connection';

export default function DigimonDropdown({ digiList, pos, trees, setTrees }) { // track evolution stage by length of stacks?

   const [digimon, setDigimon] = useState([]);

   async function chooseDigimon(digi, index) { // get evolutions then create dropdown menu of those evolutions, or pass to parent? put child on stack then do the same arr.find there?
      console.log(`chose ${digi} to start`);
      if (digiList[0] != 'Zurumon') {
         // treat as existing stack
         trees[pos].push(digi);
         setTrees([...trees]);
      } else {
         // treat as new stack
         setTrees([...trees, [digi]])
      }
   }

   useEffect(() => {
      // use supabase for image links on gifs
      async function getDigimon() {
         const data = await supabase.from('digimon').select('name, gif, evolutions')
         .then((result) => {
            setDigimon([...result['data']]);
         })
      }

      getDigimon();
   }, []);

   return (
      <>
         <Menu as='div' className='flex flex-col items-center'>
            <Menu.Button className='block mx-auto mt-4 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>
               {digiList[0] != 'Zurumon' ? 'Next Digivolution' : 'New Digimon'}
            </Menu.Button>
            <Menu.Items className='flex flex-col w-auto items-start mt-2 py-2 px-3 bg-gray-900 rounded-lg'>
               {digiList.map((digi, index) => (
                  <Menu.Item key={index} className='w-auto text-xl font-thin'>
                     {({ active }) => (
                        <div className='flex'>
                           <img src={digimon.find(d => d.name === digi).gif} alt='gif'/>
                           <button onClick={() => chooseDigimon(digi, index)} className={`${active && 'bg-gray-500'} rounded-md px-3 py-1`}>{digi}</button>
                        </div>
                     )}
                  </Menu.Item>
               ))}
            </Menu.Items>
         </Menu>
      </>
   )
}