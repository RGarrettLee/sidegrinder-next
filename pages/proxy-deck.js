import { useEffect, useState } from 'react';
import CreateStack from '../components/createStack.js'

export default function ProxyDeck() {

   const [stacks, setStacks] = useState([]);

   async function newStack() {
      let newStack = stacks;
      newStack.push(<CreateStack></CreateStack>);
      setStacks([...newStack]);
   }

   async function removeStack(index) {
      let newStack = stacks;
      newStack.splice(index, 1);
      setStacks([...newStack]);
   }

   return (
      <div>
         <h2 className="text-center text-2xl">Digimon Proxy Tracking</h2>
         <p className="text-center font-light text-md">Keep track of your inheritable effects without hassle</p>
         <button onClick={newStack} className="block mt-4 mb-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">New Stack</button>
         <div className='grid grid-flow-row auto-rows-max justify-center mb-4'>
            {stacks.map((stack, index) => {
               return (
                  <div key={index}>
                     {stack}
                     <button onClick={async() => removeStack(index)} className="mt-4 ml-16 bg-red-600 hover:bg-red-500 rounded rounded-border px-2 py-1">Remove Stack</button>
                  </div>
               )
            })}
         </div>
      </div>
   )
}