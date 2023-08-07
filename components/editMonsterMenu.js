import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ShiftModal from './shiftModal';
import SkillTreeModal from './skillTreeModal';
import SelectMonsterMenu from './selectMonsterMenu';

export default function EditMonsterMenu({ toggle, setToggle, monster, setMonster, shift, setShift, skillList, equipmentList, foodList, shiftList, statIcons, monsterList, party, setParty }) {
   const [options] = useState([
      "Skill Tree",
      "Equipment",
      "Food",
      "Shift",
      "Status",
      "Change Monster"
   ]);

   // toggles for modals
   const [skillOpen, setSkillOpen] = useState(false);
   const [equipOpen, setEquipOpen] = useState(false);
   const [foodOpen, setFoodOpen] = useState(false);
   const [shiftOpen, setShiftOpen] = useState(false);
   const [statusOpen, setStatusOpen] = useState(false);
   const [selectOpen, setSelectOpen] = useState(false);

   async function selectOption(option) {
      if (option === 'Skill Tree') {
         console.log('close & do skill tree modal');
         setToggle(false);
         setSkillOpen(true);
      } else if (option === 'Equipment') {
         console.log('close & do equipment modal');
      } else if (option === 'Food') {
         console.log('close & do food modal');
      } else if (option === 'Shift') {
         setToggle(false);
         setShiftOpen(true);
      } else if (option === 'Status') {
         console.log('close & do status modal');
      } else if (option === 'Change Monster') {
         console.log('close & do selectMonsterMenu');
         setToggle(false);
         setSelectOpen(true);
      }
   }

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
                           <Dialog.Title className='font-pixelmplus10 text-2xl px-4 py-2'>Select an Option</Dialog.Title>
                           <div className='flex flex-col justify-center items-center'>
                              {options.map((option, index) => (
                                 <div key={index}>
                                    <button onClick={() => selectOption(option)} className='font-pixelmplus10 text-xl hover:cursor-monsac hover:text-blue-200'>{option}</button>
                                 </div>
                              ))}
                           </div>
                           <button className='bg-slate-400 border-2 border-slate-300 px-5 py-2 mt-5 mb-4 rounded-lg shadow-md shadow-black font-pixelmplus10 text-xl hover:cursor-monsac hover:bg-slate-300' onClick={() => setToggle(false)}>Close</button>
                     </Dialog.Panel>
                  </div>
               </div>
               </Transition.Child>
            </Dialog>
         </Transition>
         {/* put all subsequent modals here */}

         <SkillTreeModal toggle={skillOpen} setToggle={setSkillOpen} monster={monster} skillList={skillList} statIcons={statIcons}></SkillTreeModal>
         <ShiftModal toggle={shiftOpen} setToggle={setShiftOpen} monster={monster} setMonster={setMonster} changeShift={setShift} shiftList={shiftList} statIcons={statIcons}></ShiftModal>
         <SelectMonsterMenu toggle={selectOpen} setToggle={setSelectOpen} monsterList={monsterList} party={party} setParty={setParty}></SelectMonsterMenu>
      </>
   )
}

/*

TODO

Skill Tree: not started
Equipment: not started
Food: not started
Shift: complete
Change Monster: not implemented


*/