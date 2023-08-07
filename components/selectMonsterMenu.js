import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react';

export default function SelectMonsterMenu({ toggle, setToggle, monsterList, party, setParty }) {
   const [selectedMonster, setSelectedMonster] = useState('')
   const [monsterNames, setMonsterNames] = useState([]);
   const [query, setQuery] = useState('');

   async function pickMonster(mon) {
      let newParty = party;
      let pos = monsterNames.indexOf(mon);
      let monster = monsterList[pos];

      console.log(monster.name);
      if (party.length < 6) {
         newParty.splice(newParty.length-1, 1);
         newParty.push(monster);
         newParty.push({})
      } else {
         newParty.splice(newParty.length-1, 1);
         newParty.push(monster);
      }
      setParty([...newParty]);
      console.log(party);
   }

   function getMonster(mon) {
      let pos = monsterNames.indexOf(mon);
      let monster = monsterList[pos];

      return monster;
   }

   function getSprite(mon) {
      let pos = monsterNames.indexOf(mon);
      let monster = monsterList[pos];
      let sprite = 0;

      if (monster.shift === 'light') {
         sprite = 1;
      } else if (monster.shift === 'dark') {
         sprite = 2;
      }

      return monster.sprites[sprite];
   }

   useEffect(() => {
      let names = [];
      monsterList.forEach((monster) => names.push(monster.name));
      setMonsterNames(names);
   }, [])

   const filteredMonsters =
      query === ''
         ? monsterNames
         : monsterNames.filter((monster) => {
            return monster.toLowerCase().includes(query.toLowerCase())
         })

   return (
      <>
         <Transition show={toggle} as={Fragment}>
            <Dialog as='div' className='relative z-50 cursor-monsac' open={toggle} onClose={() => setToggle(false)}>
               <Transition.Child
               as={Fragment}
               enter="transition-opacity duration-200"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="transition-opacity duration-400"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
               >
               <div className='fixed inset-0 overflow-y-auto'>
                  <div className='flex flex-col min-h-full min-w-full items-center justify-center'>
                     <Dialog.Panel className='flex flex-col items-center justify-center bg-slate-600 border-4 border-black rounded-2xl'>
                           <Dialog.Title className='font-pixelmplus10 text-2xl px-4 py-2'>Select a Monster</Dialog.Title>
                           <div className='flex flex-col justify-center items-center'>
                              <Combobox value={selectedMonster} onChange={setSelectedMonster}>
                                 <Combobox.Input className='font-pixelmplus10 px-2 rounded-lg bg-black' onChange={(event) => setQuery(event.target.value)} />
                                 <Combobox.Options className={`grid ${filteredMonsters.length > 3 ? 'grid-cols-4' : 'grid-cols-1'} items-center p-4 mt-3`}>
                                    {filteredMonsters.map((monster, index) => (
                                       <Combobox.Option className='flex flex-col items-center' onClick={() => pickMonster((monster))} key={index} value={monster}>
                                          <img src={getSprite(monster)} height={getMonster(monster).spriteSize.height} width={getMonster(monster).spriteSize.width} className='hover:animate-pulse'></img>
                                       </Combobox.Option>
                                    ))}
                                 </Combobox.Options>
                              </Combobox>
                           </div>
                           <button className='bg-slate-400 border-2 border-slate-300 px-5 py-2 mt-10 mb-4 rounded-lg shadow-md shadow-black font-pixelmplus10 text-xl hover:cursor-monsac hover:bg-slate-300' onClick={() => setToggle(false)}>Close</button>
                     </Dialog.Panel>
                  </div>
               </div>
               </Transition.Child>
            </Dialog>
         </Transition>
      </>
  )
}

/*

TO GET SPRITE

take monsters in the filtered list, compare their name against the index from monsterNames and then use that to get the sprite from monsterList

*/