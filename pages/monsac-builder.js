import { useState, useEffect } from 'react';
import MonsterBox from '../components/monsterBox';
import supabase from '../db/connection';

export default function MonsacBuilder() {
   const [monsters, setMonsters] = useState([]);
   const [skills, setSkills] = useState([]);
   const [equipment, setEquipment] = useState([]);
   const [food, setFood] = useState([]);
   const [shifts, setShifts] = useState([]);
   const [selectedMons, setSelectedMons] = useState([
      {},
   ]);
   const [sprites, setSprites] = useState({});

   useEffect(() => {
      setSprites({
         "Attack": "https://static.wikia.nocookie.net/monster-sanctuary/images/a/aa/Icon_attack.png",
         "Magic": "https://static.wikia.nocookie.net/monster-sanctuary/images/2/2d/Icon_magic.png",
         "Defense": "https://static.wikia.nocookie.net/monster-sanctuary/images/a/aa/Icon_defense.png",
         "Health": "https://static.wikia.nocookie.net/monster-sanctuary/images/3/37/Icon_health.png",
         "Mana": "https://static.wikia.nocookie.net/monster-sanctuary/images/7/70/Icon_mana.png",
      });

      async function getMonsters() {
         const data = await supabase.from('monsac-monsters').select('name, sprites, stats, equipment, food, skills, types, typeMatchup, shift, activeSkills, level, spriteSize, journalID, shiftAuras, minorStats')
         .then((result) => {
            let sorted = result['data'];
            sorted.sort((a, b) => (a.journalID - b.journalID));
            console.log(sorted);
            setMonsters([...sorted]);
         })
      }

      async function getSkills() {
         const data = await supabase.from('monsac-skills').select('name, sprite, description, type, cost, typeConnections, modifiers')
         .then((result) => {
            console.log(result['data']);
            setSkills([...result['data']]);
         })
      }

      async function getEquipment() {

      }

      async function getFood() {

      }

      async function getShifts() {
         const data = await supabase.from('monsac-shifts').select('name, description')
         .then((result) => {
            console.log(result['data']);
            setShifts([...result['data']]);
         })
      }

      getMonsters();
      getSkills();
      getShifts();
      console.log('updated');
   }, []);

   return (
      <div className='cursor-monsac'>
         <div className='flex justify-center align-center flex-col mb-10'>
            <h2 className='text-3xl text-center font-minecraftia'>Monster Sanctuary Team Builder</h2>
         </div>
         {monsters[0]?.name ? (
            <div className='flex flex-col items-center'>
               <div className='flex flex-col bg-slate-700 border-cyan-200 border-2 py-4 mb-10'>
                  <div className='bg-slate-500 border-2 border-slate-400 mx-4 rounded-lg py-8'>
                     <div className='grid grid-cols-2 grid-rows-1 mx-6 gap-6'>
                        <button className='py-4 bg-slate-400 border-2 border-slate-300 rounded-lg text-center text-3xl font-pixelmplus10 hover:cursor-monsac hover:bg-slate-300'>Save Team</button>
                        <button className='py-4 bg-slate-400 border-2 border-slate-300 rounded-lg text-center text-3xl font-pixelmplus10 hover:cursor-monsac hover:bg-slate-300'>Load Team</button>
                     </div>
                  </div>
                  <div className='grid grid-cols-3 gap-2 grid-rows-2 mt-6 mx-4'>
                     {selectedMons.map((monster, index) => (
                        <div key={index}>
                           <MonsterBox monster={monster} monsterList={monsters} skillList={skills} equipmentList={equipment} foodList={food} shiftList={shifts} iconSprites={sprites} party={selectedMons} setParty={setSelectedMons} index={index}></MonsterBox>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         ) : (
            <>
               <h2 className='text-center font-vcrosdneue text-2xl'>Loading Monsters...</h2>
            </>
         )}
         <p className='text-center'>Major work in progress, best experience on a 1920x1080 monitor, anything smaller than 1280x720 suffers dramatically</p>
      </div>
   )
}