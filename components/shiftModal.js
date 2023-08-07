import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

export default function ShiftModal({ toggle, setToggle, monster, setMonster, changeShift, shiftList, statIcons }) {
   const [shift, setShift] = useState('');
   const [pos, setPos] = useState(0);
   const [auraDesc, setAuraDesc] = useState('');
   const [auraNames, setAuraNames] = useState([]);
   const statBar = '▐';
   const [icons] = useState([
      "https://static.wikia.nocookie.net/monster-sanctuary/images/e/eb/Icon_light_passive.png",
      "https://static.wikia.nocookie.net/monster-sanctuary/images/e/ec/Icon_dark_passive.png"
   ]);

   const iconHeight = 42;
   const iconWidth = 42;
   const statIconH = 24;
   const statIconW = 24;

   useEffect(() => {
      let desc = [];
      let names = [];
      setShift(monster.shift);
      
      if (shift === 'light') {
         setPos(0);
      } else if (shift === 'dark') {
         setPos(1)
      }

      shiftList.forEach((shift) => {
         names.push(shift.name);
         desc.push(shift.description)
      });

      setAuraNames([...names]);
      setAuraDesc([...desc]);
   }, [shift])

   function generateShiftColour() {
      let colour = '';
      if (shift === 'light') {
         colour = 'text-yellow-500';
      } else if (shift === 'dark') {
         colour = 'text-blue-900';
      }

      return colour;
   }

   async function shiftAura(shift) {
      let newMonster = {...monster};
      newMonster.shift = shift;
      setShift(shift);
      changeShift(shift === 'light' ? 1 : 2);
      setMonster(newMonster);
   }

   async function removeShift(shift) {
      let newMonster = {...monster};
      newMonster.shift = shift;
      setShift(shift);
      changeShift(0);
      setMonster(newMonster);
   }

   function getDesc(aura) {
      let a = auraNames.indexOf(aura);

      return auraDesc[a];
   }

   function statCalc(shift) {
      let statNum = {'atk':['', ''], 'magic':['', ''], 'def':['', ''], 'hp':['', ''],'mana':['', '']};
      let s = 0;
      let over = 0;

      shift === 'light' ? s = 1 : s = 2;
      if (shift === 'none') s = 0;

      for (let i = 0; i < monster.stats[s].atk; ++i) {
         if (i >= monster.stats[0].atk) {
            over = 1;
         }
         if (i %5 === 0) {
            statNum.atk[over] += ' ';
         }
         statNum.atk[over] += statBar;
      }

      over = 0;

      for (let i = 0; i < monster.stats[s].magic; ++i) {
         if (i >= monster.stats[0].magic) {
            over = 1;
         }
         if (i %5 === 0) {
            statNum.magic[over] += ' ';
         }
         statNum.magic[over] += statBar;
      }
      over = 0;
      for (let i = 0; i < monster.stats[s].def; ++i) {
         if (i >= monster.stats[0].def) {
            over = 1;
         }
         if (i %5 === 0) {
            statNum.def[over] += ' ';
         }
         statNum.def[over] += statBar;
      }

      over = 0;

      for (let i = 0; i < monster.stats[s].hp; ++i) {
         if (i >= monster.stats[0].hp) {
            over = 1;
         }
         if (i %5 === 0) {
            statNum.hp[over] += ' ';
         }
         statNum.hp[over] += statBar;
      }

      over = 0;

      for (let i = 0; i < monster.stats[s].mana; ++i) {
         if (i >= monster.stats[0].mana) {
            over = 1;
         }
         if (i %5 === 0) {
            statNum.mana[over] += ' ';
         }
         statNum.mana[over] += statBar;
      }

      let stats = {'atk': statNum.atk[0], 'magic': statNum.magic[0], 'def': statNum.def[0], 'hp': statNum.hp[0], 'mana': statNum.mana[0]};
      let diff = {'atk': statNum.atk[1], 'magic': statNum.magic[1], 'def': statNum.def[1], 'hp': statNum.hp[1], 'mana': statNum.mana[1]};

      if (shift !== 'none') {
         statNum.atk = <p className='text-sm px-1'>{stats.atk}<span className={`${shift === 'light' ? 'text-yellow-500' : 'text-blue-800'} text-sm`}>{diff.atk}</span></p>
         statNum.magic = <p className='text-sm px-1'>{stats.magic}<span className={`${shift === 'light' ? 'text-yellow-500' : 'text-blue-800'} text-sm`}>{diff.magic}</span></p>
         statNum.def = <p className='text-sm px-1'>{stats.def}<span className={`${shift === 'light' ? 'text-yellow-500' : 'text-blue-800'} text-sm`}>{diff.def}</span></p>
         statNum.hp = <p className='text-sm px-1'>{stats.hp}<span className={`${shift === 'light' ? 'text-yellow-500' : 'text-blue-800'} text-sm`}>{diff.hp}</span></p>
         statNum.mana = <p className='text-sm px-1'>{stats.mana}<span className={`${shift === 'light' ? 'text-yellow-500' : 'text-blue-800'} text-sm`}>{diff.mana}</span></p>
      } else {
         statNum.atk = <p className='text-sm px-1'>{stats.atk}</p>
         statNum.magic = <p className='text-sm px-1'>{stats.magic}</p>
         statNum.def = <p className='text-sm px-1'>{stats.def}</p>
         statNum.hp = <p className='text-sm px-1'>{stats.hp}</p>
         statNum.mana = <p className='text-sm px-1'>{stats.mana}</p>
      }

      return (
         <div className='flex flex-col items-start px-4'>
            <div className='flex items-center'>
               <img src={statIcons.Attack} height={statIconH} width={statIconW}></img>
               {statNum.atk}
            </div>
            <div className='flex items-center'>
               <img src={statIcons.Magic} height={statIconH} width={statIconW}></img>
               {statNum.magic}
            </div>
            <div className='flex items-center'>
               <img src={statIcons.Defense} height={statIconH} width={statIconW}></img>
               {statNum.def}
            </div>
            <div className='flex items-center'>
               <img src={statIcons.Health} height={statIconH} width={statIconW}></img>
               {statNum.hp}
            </div>
            <div className='flex items-center'>
               <img src={statIcons.Mana} height={statIconH} width={statIconW}></img>
               {statNum.mana}
            </div>
         </div>
      );
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
                        <Dialog.Title className='font-pixelmplus10 text-2xl px-4 py-2'>{shift === 'none' ? 'Select a Shift' : <p>Currently <span className={generateShiftColour()}>{shift.toUpperCase()}</span> Shifted</p>}</Dialog.Title>
                           {shift === 'none' ? (
                              <div className='flex flex-col items-center px-4'>
                                 <button onClick={() => shiftAura('light')} className='shadow-md shadow-black bg-slate-500 border-2 border-slate-300 px-2 py-2 rounded-lg hover:cursor-monsac hover:bg-slate-400'>
                                    <div className='flex items-center'>
                                       <div className='flex flex-col justify-center items-center w-96'>
                                          <div className='flex items-center'>
                                             <img src={icons[0]} height={iconHeight} width={iconWidth}></img>
                                             <span className='font-pixelmplus10 text-3xl px-2 text-yellow-500'>{monster.shiftAuras[0]}</span>
                                          </div>
                                          <p className='font-pixelmplus10 break-normal'>{getDesc(monster.shiftAuras[0])}</p>
                                       </div>
                                       {statCalc('light')}
                                    </div>
                                 </button>
                                 <button onClick={() => shiftAura('dark')} className='flex items-center shadow-md shadow-black bg-slate-500 border-2 border-slate-300 px-2 py-2 rounded-lg hover:cursor-monsac hover:bg-slate-400 mt-4'>
                                    <div className='flex items-center'>
                                       <div className='flex flex-col justify-center items-center w-96'>
                                          <div className='flex items-center'>
                                             <img src={icons[1]} height={iconHeight} width={iconWidth}></img>
                                             <span className='font-pixelmplus10 text-3xl px-2 text-blue-900'>{monster.shiftAuras[1]}</span>
                                          </div>
                                          <p className='font-pixelmplus10 break-normal'>{getDesc(monster.shiftAuras[1])}</p>
                                       </div>
                                       {statCalc('dark')}
                                    </div>
                                 </button>
                              </div>
                           ) : (
                              <div className='flex flex-col items-center px-4'>
                                 <div className='flex items-center'>
                                    <div className='flex flex-col items-center'>
                                          <div className='flex items-center'>
                                          <img src={icons[pos]} height={iconHeight} width={iconWidth}></img>
                                          <p className='font-pixelmplus10 text-3xl px-2'>{monster.shiftAuras[pos]}</p>
                                       </div>
                                       <div className='w-96'>
                                          <p className='font-pixelmplus10 text-md px-2 pt-2 break-normal text-center'>{getDesc(monster.shiftAuras[pos])}</p>
                                       </div>
                                    </div>
                                    {statCalc(shift)}
                                 </div>
                                 <p className='font-pixelmplus10 text-2xl pt-6 pb-2'>Change Shift</p>
                                 <button onClick={() => shiftAura(shift === 'light' ? 'dark' : 'light')} className='flex items-center shadow-md shadow-black bg-slate-500 border-2 border-slate-300 px-2 py-2 rounded-lg hover:cursor-monsac hover:bg-slate-400'>
                                    <div className='flex'>
                                       <div className='flex flex-col items-center justify-center w-96'>
                                          <div className='flex items-center'>
                                             <img src={icons[shift === 'light' ? 1 : 0]} height={iconHeight} width={iconWidth}></img>
                                             {shift === 'light' ? <span className='font-pixelmplus10 text-3xl px-2 text-blue-900'>{monster.shiftAuras[1]}</span> : <span className='font-pixelmplus10 text-3xl px-2 text-yellow-500'>{monster.shiftAuras[0]}</span>}
                                          </div>
                                          <p className='font-pixelmplus10 px-2 pt-2 break-normal text-center'>{getDesc(monster.shiftAuras[shift === 'light' ? 1 : 0])}</p>
                                       </div>
                                          {shift === 'light' ? (
                                             <>
                                                {statCalc('dark')}
                                             </>
                                          ) : (
                                             <>
                                                {statCalc('light')}
                                             </>
                                          )}
                                    </div>
                                 </button>
                                 <button onClick={() => removeShift('none')} className='mt-2 shadow-md shadow-black bg-slate-500 border-2 border-slate-300 px-2 py-2 rounded-lg hover:cursor-monsac hover:bg-slate-400'>
                                    <div className='flex'>
                                       <div className='flex items-center'>
                                          <p className='font-pixelmplus10 text-3xl pl-1'>Unshifted</p>
                                       </div>
                                    </div>
                                 </button>
                              </div>
                           )}
                        <button className='bg-slate-400 border-2 border-slate-300 px-5 py-2 mt-5 mb-4 rounded-lg shadow-md shadow-black font-pixelmplus10 text-xl hover:cursor-monsac hover:bg-slate-300' onClick={() => setToggle(false)}>Close</button>
                  </Dialog.Panel>
               </div>
            </div>
            </Transition.Child>
         </Dialog>
      </Transition>
   </>
   )
}