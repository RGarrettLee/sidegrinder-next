import { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';


export default function SkillTreeModal({ toggle, setToggle, monster, skillList, statIcons }) {

   const [skillpoints, setSkillpoints] = useState(monster.level + 2);
   const [shift, setShift] = useState(0);
   const [skillNames, setSkillNames] = useState([]);
   const [active, setActive] = useState([]);
   const [skillDesc, setSkillDesc] = useState([]);
   const [skillSprites, setSkillSprites] = useState([]);
   const [manaRegen, setManaRegen] = useState(0);
   const [critChance, setCritChance] = useState(0);
   const [critDamage, setCritDamage] = useState(0);
   const statBar = '▐';

   const [icons] = useState({
      "1": "https://static.wikia.nocookie.net/monster-sanctuary/images/b/bb/Skill_lvl_1.png",
      "2": "https://static.wikia.nocookie.net/monster-sanctuary/images/a/a5/Skill_lvl_2.png",
      "3": "https://static.wikia.nocookie.net/monster-sanctuary/images/c/c0/Skill_lvl_3.png",
      "4": "https://static.wikia.nocookie.net/monster-sanctuary/images/3/3c/Skill_lvl_4.png",
      "5": "https://static.wikia.nocookie.net/monster-sanctuary/images/9/9b/Skill_lvl_5.png"
   });

   const [weaknessIcons] = useState({
      "Magic": "https://static.wikia.nocookie.net/monster-sanctuary/images/4/48/Icon_weakness_magical.png",
      "Water": "https://static.wikia.nocookie.net/monster-sanctuary/images/8/8c/Icon_weakness_water.png",
      "Earth": "https://static.wikia.nocookie.net/monster-sanctuary/images/3/3d/Icon_weakness_earth.png",
      "Wind": "https://static.wikia.nocookie.net/monster-sanctuary/images/6/65/Icon_weakness_wind.png",
      "Fire": "https://static.wikia.nocookie.net/monster-sanctuary/images/d/d0/Icon_weakness_fire.png",
   });

   const [resistIcons] = useState({
      "Attack": "https://static.wikia.nocookie.net/monster-sanctuary/images/2/29/Icon_physical_resistance.png",
      "Wind": "https://static.wikia.nocookie.net/monster-sanctuary/images/3/38/Icon_wind_resistance.png",
      "Elemental Shift": "https://static.wikia.nocookie.net/monster-sanctuary/images/a/ad/Icon_elemental_shift.png",
      "Fire": "https://static.wikia.nocookie.net/monster-sanctuary/images/8/83/Icon_fire_resistance.png",
   });

   const [shiftIcons] = useState({
      "light": "https://static.wikia.nocookie.net/monster-sanctuary/images/e/eb/Icon_light_passive.png",
      "dark": "https://static.wikia.nocookie.net/monster-sanctuary/images/e/ec/Icon_dark_passive.png"
   });

   useEffect(() => {
      setManaRegen(monster.minorStats.manaRegen);
      setCritChance(monster.minorStats.critChance);
      setCritDamage(monster.minorStats.critDamage);

      if (monster.shift === 'none') setShift(0);
      else if (monster.shift === 'light') setShift(1);
      else if (monster.shift === 'dark') setShift(2);

      let names = [];
      let sprites = [];
      let desc = [];
      let activeSkills = [];
      skillList.forEach((skill) => {
         names.push(skill.name);
         sprites.push(skill.sprite);
         desc.push(skill.description);
      });

      if (active.length === 0) {
         for (let i = 0; i < names.length; ++i) {
            activeSkills.push(false);
         }
         setActive([...activeSkills]);
      }

      setSkillNames([...names]);
      setSkillSprites([...sprites]);
      setSkillDesc([...desc]);
   }, [monster]);

   const skillLvlHeight = 10;
   const skillLvlWidth = 10;
   const skillHeight = 45;
   const skillWidth = 45;
   const shiftHeight = 42;
   const shiftWidth = 42;
   const statIconH = 24;
   const statIconW = 24;

   function statMath (stat) { // calculate stat numbers using the base values
      if (monster !== {}) {
         if (stat === 'Attack') {
            return Math.round(monster.stats[shift].atk * (10 + monster.level) / 2);
         } else if (stat === 'Magic') {
            return Math.round(monster.stats[shift].magic * (10 + monster.level) / 2);
         } else if (stat === 'Defense') {
            return Math.round(monster.stats[shift].def * (10 + monster.level) * 7 / 10);
         } else if (stat === 'Health') {
            return Math.round((5 + monster.stats[shift].hp) * (10 + monster.level) * 4.5 * (1 + monster.level / 100));
         } else if (stat === 'Mana') {
            return Math.round((8 + monster.stats[shift].mana * 1.3) * (40 + monster.level * 2) / 8);
         } else if (stat === 'Mana Regen') {
            return 0;
         }
      }
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
         <div className='flex'>
            <div className='flex flex-col items-end justify-center font-pixelmplus10 text-xl pl-4'>
               <p>{statMath('Attack')}</p>
               <p>{statMath('Magic')}</p>
               <p>{statMath('Defense')}</p>
               <p>{statMath('Health')}</p>
               <p>{statMath('Mana')}</p>
            </div>
            <div className='flex flex-col items-start pl-2 pr-4'>
               <div className='flex items-center pb-1.5'>
                  <img src={statIcons.Attack} height={statIconH} width={statIconW}></img>
                  {statNum.atk}
               </div>
               <div className='flex items-center pb-1'>
                  <img src={statIcons.Magic} height={statIconH} width={statIconW}></img>
                  {statNum.magic}
               </div>
               <div className='flex items-center pb-1.5'>
                  <img src={statIcons.Defense} height={statIconH} width={statIconW}></img>
                  {statNum.def}
               </div>
               <div className='flex items-center pb-1'>
                  <img src={statIcons.Health} height={statIconH} width={statIconW}></img>
                  {statNum.hp}
               </div>
               <div className='flex items-center'>
                  <img src={statIcons.Mana} height={statIconH} width={statIconW}></img>
                  {statNum.mana}
               </div>
            </div>
         </div>
      );
   }

   function getSprite(skill) {
      return skillSprites[skillNames.indexOf(skill)];
   }

   function toggleActive(skill) {
      let pos = skillNames.indexOf(skill);
      let newActive = active;
      console.log(`clicked!`);

      if (skillList[pos].type !== 'Ultimate') {
         if (skillpoints > 0) {
            if (active[pos] === false) {
               newActive[pos] = true;
               setActive([...newActive]);
      
               //TODO valid checking -> check if pre-requisite skill was selected and take skill point
               let points = skillpoints;
               points -= 1;
               setSkillpoints(points);
            } else {
               newActive[pos] = false;
               setActive([...newActive]);
      
               //TODO return skill point and deselect any skills that require the unequipped skill as a pre-req
               let points = skillpoints;
               points += 1;
               setSkillpoints(points);
            }
            console.log(`Set ${skill} to ${newActive[pos]} -> Position of skill: ${pos}`);
         } else {
            window.alert('You are out of skill points!');
         }
      } else {
         console.log('ult stuff');
      }
   }

   function checkDuplicate() {
      // check if a skill appears multiple times in a tree, get all instances of it then check where they are active and return whether the one selected is active/inactive
   }

   function resetSkills() {
      setSkillpoints(monster.level + 2);
      let activeSkills = active;
      activeSkills.fill(false);
      setActive([...activeSkills]);
   }

   function readSkillTree() {
      console.log('\n\n');
      console.log(monster.skills['Lvl1']);

      console.log('Printing skills...');
      monster.skills['Lvl1'].forEach((skill) => console.log(skill));

      console.log('Mimicing tree reading...');
      Object.keys(monster.skills).map((name) => {
         console.log('\n===NAME===');
         console.log(name);
         monster.skills[name].map((tree) => {
            console.log('\n===TREE==');
            console.log(tree);
            tree.map((list) => {
               console.log('\n===LIST===');
               console.log(list);
               if (Object.keys(list).length > 1) {
                  list[1].map((skill) => console.log(skill));
                  list[2].map((skill) => console.log(skill));
               } else {
                  list[1].map((skill) => console.log(skill));
               }
            })
         })
      })

      console.log('\n===ACTIVE SKILLS===');
      active.map((skill, index) => {
         if (skill === true) console.log(skillNames[index]);
      });
      return (
         <>
         </>
      )
   }

   return (
      <>
      <Transition show={toggle} as={Fragment}>
         <Dialog as='div' className='relative z-40 cursor-monsac' open={toggle} onClose={() => setToggle(false)}>
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
                        <Dialog.Title className='font-pixelmplus10 text-2xl px-4 py-2'>Skill Tree</Dialog.Title>
                        <div className='flex items-center justify-center bg-slate-900 px-1 py-2 w-full'>
                           <img src={monster.sprites[shift]} height={monster.spriteSize.height} width={monster.spriteSize.width}></img>
                           <div className='flex flex-col font-pixelmplus10 text-2xl px-2 pr-4'>
                              <p className='text-yellow-500'>{monster.name}</p>
                              <p>Level {monster.level}</p>
                              <p>Skillpoints <span className='text-yellow-500'>{skillpoints}</span></p>
                           </div>
                           {statCalc(monster.shift)}
                           <div className='flex flex-col font-pixelmplus10 text-2xl px-4'>
                              <p>Mana Regen: {manaRegen}</p>
                              <p>Crit Chance: {critChance}%</p>
                              <p>Crit Damage: {critDamage}%</p>
                           </div>
                           <div className='flex flex-col items-center gap-2 mx-3'>
                              <div className='flex gap-2'>
                                 {monster.typeMatchup['Resists'].map((type, index) => (
                                    <img src={resistIcons[type]} height={shiftHeight} width={shiftWidth} key={index}></img>
                                 ))}
                              </div>
                              <div className='flex gap-2'>
                                 {monster.typeMatchup['Weaknesses'].map((type, index) => (
                                    <img src={weaknessIcons[type]} height={shiftHeight} width={shiftWidth} key={index}></img>
                                 ))}
                                 {monster.shift !== 'none' ? (
                                    <img src={shiftIcons[monster.shift]} height={shiftHeight} width={shiftWidth}></img>
                                 ) : ( <></> )}
                              </div>
                           </div>
                        </div>
                        {readSkillTree()}
                        <div className='flex font-pixelmplus10 text-3xl mt-4 mx-4'>
                           <div className='flex flex-col items-center gap-2'>
                              {Object.keys(monster.skills).map((name, index) => (
                                 <div className='flex items-center gap-2' key={index}>
                                    {monster.skills[name].map((tree, index) => (
                                       <div className='flex gap-2' key={index}>
                                          {tree.map((list, index) => (
                                             <div className='w-72' key={index}>
                                                {Object.keys(list).length > 1 ? (
                                                   <div className='flex flex-col items-center gap-2 bg-slate-400 border-2 border-slate-300 p-4 rounded-lg' key={index}>
                                                      <div className='flex gap-2'>
                                                         {list[1].map((skill, index) => (
                                                            <button onClick={() => toggleActive(skill)} className={`${active[skillNames.indexOf(skill)] === false ? 'brightness-50' : 'brightness-100 ring-4 ring-yellow-500 rounded-lg'} hover:cursor-monsac`} key={index}>
                                                               <img src={getSprite(skill)} height={skillHeight} width={skillWidth}></img>
                                                            </button>
                                                         ))}
                                                      </div>
                                                      <div className='flex gap-1 px-5'>
                                                         {list[2].map((skill, index) => (
                                                            <button onClick={() => toggleActive(skill)} className={`${active[skillNames.indexOf(skill)] === false ? 'brightness-50' : 'brightness-100 ring-4 ring-yellow-500 rounded-lg'} hover:cursor-monsac`} key={index}>
                                                               <img src={getSprite(skill)} height={skillHeight} width={skillWidth}></img>
                                                            </button>
                                                         ))}
                                                      </div>
                                                   </div>
                                                ) : (
                                                   <div className='flex justify-center gap-1 bg-slate-400 border-2 border-slate-300 py-4 px-3 rounded-lg w-72'>
                                                      {list[1].map((skill, index) => (
                                                         <button onClick={() => toggleActive(skill)} className={`${active[skillNames.indexOf(skill)] === false ? 'brightness-50' : 'brightness-100 ring-4 ring-yellow-500 rounded-lg'} hover:cursor-monsac`} key={index}>
                                                            <img src={getSprite(skill)} height={skillHeight} width={skillWidth}></img>
                                                         </button>
                                                      ))}
                                                   </div>
                                                )}
                                             </div>
                                          ))}
                                       </div>
                                    ))}
                                 </div>
                              ))}
                           </div>
                        </div>
                        <button className='bg-slate-400 border-2 border-slate-300 px-5 py-2 mt-3 rounded-lg shadow-md shadow-black font-pixelmplus10 text-xl hover:cursor-monsac hover:bg-slate-300' onClick={() => resetSkills()}>Reset</button>
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

change db type matchup to arrays so you can map through them
change active and setActive to not be an array with the length of skillNames
-> This needs to be changed to an object representing all the skills in the tree (including dupes)
-> create function which can read through the object to determine whether a skill is active or not

*/