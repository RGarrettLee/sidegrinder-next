import { useEffect, useState } from 'react';

export default function DigimonStats({ method }) {

   const [stats, setStats] = useState([]);
   const [current, setCurrent] = useState([]);

   // parse evo method and split into groups (i.e. AP reqs)
   // parse each method between "&" symbols and split

   useEffect(() => {
      function parseEvo() {
         if (method != undefined) {
            let data = [];
            let str = '';
            for (let i = 0; i < method.length; ++i) {
               if (method[i] === '&') {
                  if (!str.includes('AP')) {
                     str = '';
                  } else {
                     data.push(str.trim());
                     str = '';
                  }
               } else if (method[i] != '>' && method[i] != '=') {
                  str += method[i]
               }
            }

            if (str.includes('AP')) {
               data.push(str.trim());
            }
      
            setStats([...data]);

            let curr = [];
            
            for (let i = 0; i < data.length; i++) {
               curr.push(0);
            }

            setCurrent([...curr]);
         }
      }

      parseEvo();
   }, []);

   function getRange(stat) {
      return stat.replace(/\D/g, "");
   }

   function changeSlider(index) {
      let curr = current;
      let value = event.target.value;
      console.log(value);
      curr[index] = value;
      setCurrent([...curr]);
      //curr[index] = event.target.value;
      //setCurrent([...current]);
   }

   function currentState(index) {
      let str = `${current[index]} / `;
      str += stats[index];
      return str;
   }

   return (
      <>
         {stats.map((stat, index) => (
            <div key={index} className='flex flex-col justify-center'>
               <label className='mx-2' htmlFor='AP-Slider'>{currentState(index)}</label>
               <input className='mx-2' id='AP-Slider' onChange={() => changeSlider(index)} type='range' min='0' max={getRange(stat)} defaultValue='0' step='1'></input>
            </div>
         ))}
      </>
   )
}