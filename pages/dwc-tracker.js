import { useEffect, useState} from 'react';
import supabase from '../db/connection';
import DigimonStats from '../components/digimonStats';
import DigimonDropdown from '../components/digimonDropdown';

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

//TODO
// add stat tracking

export default function DWCTracker() {
   const [digimon, setDigimon] = useState([]);
   const [freshDigimon, setFreshDigimon] = useState([]);
   const [trees, setTrees] = useState([]);

   useEffect(() => {
      setFreshDigimon([
         'Zurumon',
         'Choromon',
         'Nyokimon',
         'Pabumon',
         'Pichimon',
         'Petitmon',
         'Punimon',
         'Botamon',
         'Poyomon',
         'Mokumon',
         'YukimiBotamon',
         'Yuramon'
      ])

      async function getDigimon() {
         const data = await supabase.from('digimon').select('name, gif, evolutions')
         .then((result) => {
            setDigimon([...result['data']]);
         })
      }

      getDigimon();
   }, [])

   function getEvolutionOptions(tree) {
      let digi = tree[tree.length - 1];
      let evos = digimon.find(d => d.name === digi).evolutions;
      return Object.keys(evos); // pass evo methods as well or display them on tree rather than in dropdown
   }

   function getEvolutionMethod(digi, tree, index) {
      // take ${digi} and find the evolution methods of the next digimon in the tree
      if (index > 0) {
         let evolutions = digimon.find(d => d.name === tree[index - 1]).evolutions;
         let nextStage = Object.keys(evolutions).find(d => d === digi);
         return evolutions[nextStage];
      }
   }

   function removeTree(index) {
      let newTrees = trees;
      newTrees.splice(index, 1);
      setTrees([...newTrees]);
   }

   function removeDigimon(tree, index) {
      let newTrees = trees;
      newTrees[tree].splice(index);
      if (newTrees[tree].length === 0) {
         newTrees.splice(tree, 1);
      }
      setTrees([...newTrees])
   }

   return (
      <>
         <div className='flex justify-center align-center flex-col'>
            <h1 className='text-center text-2xl'>Digimon World Championship Tracker</h1>
            <p className='text-center text-md font-light'>Track digivolutions with ease</p>
            <DigimonDropdown digiList={freshDigimon} trees={trees} setTrees={setTrees}></DigimonDropdown>
         </div>
         <div className='mt-10 grid grid-flow-row auto-rows-auto'>
            {/* create grid for existing evo stacks displaying gif, name, evo method, (and a way to track?) */}
            {/* display new stage button and current stack */}
            {trees.map((tree, index) => (
               <div key={index}>
                  <DigimonDropdown digiList={getEvolutionOptions(tree)} pos={index} trees={trees} setTrees={setTrees}></DigimonDropdown>
                  <div className="flex flex-col items-center">
                     <ul className='flex flex-col items-center w-auto mt-4 py-2 px-3 bg-gray-900 rounded-lg'>
                        {tree.map((stage, pos) => (
                           <div key={pos} className='w-auto text-xl font-thin'>
                              <li className="inline-flex">
                                 {/* use digimon.find to get evolutions, then check evolutions for the next stage in evolution and then display that method */}
                                    <img src={digimon.find(d => d.name === stage).gif} alt='gif'/>
                                    <button className="hover:cursor-default">{stage}</button>
                                    <button className='hover:cursor-default font-normal px-2'>{getEvolutionMethod(stage, tree, pos)}</button>
                                    {/* create component for stat tracking (state and css) */}
                                    <DigimonStats method={getEvolutionMethod(stage, tree, pos)}></DigimonStats>
                                    <button onClick={() => removeDigimon(index, pos)} className="mx-2 bg-red-600 hover:bg-red-500 rounded rounded-border px-2 py-1">Remove Digimon</button>
                              </li>
                           </div>
                        ))}
                     </ul>
                     <button onClick={() => removeTree(index)} className="mx-2 mt-3 mb-6 bg-red-600 hover:bg-red-500 rounded rounded-border px-2 py-1">Remove tree</button>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}