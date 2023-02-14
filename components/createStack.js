import { useEffect, useState } from 'react';
import { useRouter } from 'react';

export default function CreateStack() {
   const apiEndpoint = 'https://digimoncard.io/api-public/search.php?card='
   const artAPI = 'https://images.digimoncard.io/images/cards/';
   const [search, setSearch] = useState('');
   const [stack, setStack] = useState([]);
   const [card, setCard] = useState({});

   function updateSearch(event) {
      setSearch(event.target.value);
   }

   async function cardSearch(e) {
      e.preventDefault()
      fetch(`${apiEndpoint}${search}`)
         .then((response) => response.json())
         .then((cardData) => {
            console.log(cardData[0]);
            if (cardData[0] == undefined) {
               setCard({});
            } else {
               setCard(cardData[0]);
            }
         })
         .catch((error) => {
            console.log(error);
         })
   }

   async function addCard() {
      console.log('adding card...');
      let inherited = `${card['name']}: ${card['soureeffect']}`;
      setStack([inherited, ...stack]);
      setCard({});
      setSearch('');
   }

   async function removeCard(index) {
      let newStack = stack;
      newStack.splice(index, 1);
      setStack([...newStack]);
   }

   return (
      <div className="block mt-4">
         <div className="flex flex-col w-auto justify-center items-start mx-16 bg-gray-700 rounded rounded-border p-4">
            <h1 className="font-bold text-lg pb-2">Add/Remove Cards</h1>
            <h1 className="text-xl font-medium pb-1">Search Card ID:</h1>
            <input onChange={updateSearch} value={search} type='text' autoFocus className='mb-4 px-2 bg-gray-500' placeholder='Enter a card ID...'></input>
            <button onClick={cardSearch} type='button' className="rounded rounded-border bg-gray-500 hover:bg-gray-400 px-2">Search</button>

            {!card.name ? (
                    <></>
                ) : (
                    <div className="mt-8">
                        <img src={`${artAPI}${card['cardnumber']}.jpg`} alt="card image"></img>
                        <button onClick={addCard} className="mt-4 bg-green-600 hover:bg-green-500 rounded rounded-border px-2 py-1">Add to Stack</button>
                    </div>
                )}

            <ul className='mt-3'>
               {stack.map((c, index) => (
                  <div key={index} className='flex flex-row'>
                     <li className='font-thin text-xl mt-2'>{c}</li>
                     <button onClick={() => removeCard(index)} className="mx-2 mt-2 bg-red-600 hover:bg-red-500 rounded rounded-border px-2 py-1">Remove card</button>
                  </div>
                  ))}
            </ul>
         </div>
      </div>
   )
}