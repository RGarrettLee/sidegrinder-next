import { useState, useEffect } from 'react';
import SelectMonsterMenu from './selectMonsterMenu';
import EditMonsterMenu from './editMonsterMenu';

export default function MonsterBox({ monster, monsterList, skillList, equipmentList, foodList, shiftList, iconSprites, party, setParty, index }) {
   const [mon, setMonster] = useState({});
   const [shift, setShift] = useState(0);
   const [selectIsOpen, setSelectIsOpen] = useState(false);
   const [editIsOpen, setEditIsOpen] = useState(false);

   const iconHeight = '28';
   const iconWidth = '28';

   useEffect(() => {
      setMonster(monster); // create instance of the current monster selected which can be manipulated down multiple layers of components

      if (monster.shift === 'none') {
         setShift(0);
      } else if (monster.shift === 'light') {
         setShift(1);
      } else if (monster.shift === 'dark') {
         setShift(2);
      }

      console.log('monster box update');
   }, [monster]);

   function statMath (stat) { // calculate stat numbers using the base values
      if (mon !== {}) {
         if (stat === 'Attack') {
            return Math.round(mon.stats[shift].atk * (10 + mon.level) / 2);
         } else if (stat === 'Magic') {
            return Math.round(mon.stats[shift].magic * (10 + mon.level) / 2);
         } else if (stat === 'Defense') {
            return Math.round(mon.stats[shift].def * (10 + mon.level) * 7 / 10);
         } else if (stat === 'Health') {
            return Math.round((5 + mon.stats[shift].hp) * (10 + mon.level) * 4.5 * (1 + mon.level / 100));
         } else if (stat === 'Mana') {
            return Math.round((8 + mon.stats[shift].mana * 1.3) * (40 + mon.level * 2) / 8);
         }
      }
   }

   return (
      <div className='w-max'>
         {mon?.name ? (
            <button onClick={() => setEditIsOpen(true)} className='bg-slate-500 border-2 border-slate-400 rounded-lg hover:border-white hover:cursor-monsac'>
               <div className='flex'>
                  <div className='grid grid-cols-1 gap-5 items-center'>
                     <h2 className='text-2xl font-pixelmplus10'>{mon.name}</h2>
                     <div className='flex flex-col items-center justify-center xl:h-24 xl:w-52 lg:h-16 lg:w-32'>
                        <img src={mon.sprites[shift]} height={mon.spriteSize.height} width={mon.spriteSize.width} className='ml-2'></img>
                     </div>
                     <p className='text-yellow-500 font-pixelmplus10 text-2xl mt-4'>Lvl {mon.level}</p>
                  </div>
               <div className='flex mx-5'>
                     <div className='flex-col flex'>
                        <div className='mt-9'>
                           <img src={iconSprites.Attack} height={iconHeight} width={iconWidth} className='pt-1'></img>
                           <img src={iconSprites.Magic} height={iconHeight} width={iconWidth} className='pt-1'></img>
                           <img src={iconSprites.Defense} height={iconHeight} width={iconWidth} className='pt-1'></img>
                           <img src={iconSprites.Health} height={iconHeight} width={iconWidth} className='pt-1'></img>
                           <img src={iconSprites.Mana} height={iconHeight} width={iconWidth} className='pt-1'></img>
                        </div>
                     </div>
                     <div className='flex flex-col items-end ml-4 mt-9'>
                           <p className='font-pixelmplus10 text-2xl'>{statMath('Attack')}</p>
                           <p className='font-pixelmplus10 text-2xl'>{statMath('Magic')}</p>
                           <p className='font-pixelmplus10 text-2xl'>{statMath('Defense')}</p>
                           <p className='font-pixelmplus10 text-2xl'>{statMath('Health')}</p>
                           <p className='font-pixelmplus10 text-2xl'>{statMath('Mana')}</p>
                        </div>
                  </div>
               </div>
               <EditMonsterMenu toggle={editIsOpen} setToggle={setEditIsOpen} monster={mon} setMonster={setMonster} shift={shift} setShift={setShift} skillList={skillList} equipmentList={equipmentList} foodList={foodList} shiftList={shiftList} statIcons={iconSprites} monsterList={monsterList} party={party} setParty={setParty}></EditMonsterMenu>
            </button>
         ) : (
            <button onClick={() => setSelectIsOpen(true)} className='bg-slate-500 border-2 border-slate-400 rounded-lg hover:border-white hover:cursor-monsac'>
               <div className='flex flex-col items-center mx-2 px-0.5'>
                  <h2 className='text-2xl text-center font-pixelmplus10 mx-10'>Click to add Monster</h2>
                  <img src="https://clipart-library.com/images/kTKoB87zc.png" height="174" width="174" className='mb-2'></img>
                  <SelectMonsterMenu toggle={selectIsOpen} setToggle={setSelectIsOpen} monsterList={monsterList} party={party} setParty={setParty}></SelectMonsterMenu>
               </div>
            </button>
         )}
      </div>
   )
}

/*
BEFORE YOU GET TOO FAR INTO THI AND FORGET WHATS GOING ON

monsters is being passed in to give us the global list of monsters without having to load it from the database during every instance of the box

monster is the current monster being iterated through the list of selectedMonsters / monsters on the team

setMons is the setSelectedMonsters variable so we can update the list of what is currently on the team by updating it


GOAL OF THIS FUNCTION

create the surrounding box and formatting of the monster

name
sprite
stats (get sprites for each stat type: atk, magic, def, hp, mana)
level *stuck at 42 for the purposes of this, can chnage later

IF box is empty / no monster in the box

bring up monster select component, create this component later. Model after the DigimonDropdown but instead of every digimon shown, give combobox to let them type in names as well

IF monster in the box

bring up window picking between:
- Equipment
- Skill Tree
- Food
- Shift
- Status

^^^ TURN THIS INTO A MODAL ALONG WITH EACH COMPONENT BEING A MODAL OF SOME KIND

probably make each component a modal and then load them all underneath the main monsterBox code

and then appropriately create components dealing with each of those


CURRENT WORKFLOW OF COMPONENTS TO BUILD

monsterBox -> monsterDropdown -> Equipment -> Skill Tree -> Food -> Shift -> Status

thought process

have one empty element to bring the buffer "Click to add Monster" 

click to open a modal with the combobox within it

check conditional for the size of the array being 6

when selecting a monster, if it would be the 6th monster, don't push and slice the array removing the empty object

*/
