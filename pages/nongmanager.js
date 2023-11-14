import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../db/connection';

export default function NONGManager({ user }) {
   const { admin } = user;
   const [allLevels, setAllLevels] = useState([]);
   const [search, setSearch] = useState('');
   const [name, setName] = useState('');
   const [level_id, setLevelID] = useState('');
   const [song_id, setSongID] = useState('');
   const [replacement, setReplacement] = useState('');
   const router = useRouter();

   useEffect(() => {
      async function getLevels() {
         const data = await supabase.from('nong-database').select('name, levelID, songID')
            .then((result) => {
               setAllLevels(result['data']);
            });
      }

      getLevels();
      console.log(user);
   }, [])

   function updateSearch(event) {
      setSearch(event.target.value);
   }

   function updateName(event) {
      setName(event.target.value);
   }

   function updateLevelID(event) {
      setLevelID(event.target.value);
   }

   function updateSongID(event) {
      setSongID(event.target.value);
   }

   function updateReplacement(event) {
      setReplacement(event.target.value);
   }

   function downloadNONG() {

   }

   async function addLevel() {
      const { error } = await supabase.from('nong-database').insert({name: name, levelID: level_id, songID: song_id, replacementLink: replacement, active: false});
      setName('');
      setLevelID('');
      setSongID('');
      setReplacement('');
      router.reload(window.location.pathname);
   }

   async function deleteLevel(name) {
      const { error } = await supabase.from('nong-database').delete().eq('name', name);
      router.reload(window.location.pathname);
   }

   const filteredLevels =
      search === ''
         ? allLevels
         : allLevels.filter((level) => {
            return level.name.toLowerCase().includes(search.toLowerCase())
         }).slice(0, 400);

   return (
      <div>
         <h2 className='text-2xl text-center'>NONG Manager</h2>
         <p className='text-center text-md font-light'>Manage your NONG songs on Geometry Dash with ease</p>
         <button className="block mt-4 mb-8 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"><a href='https://github.com/RGarrettLee/nong-manager' target='_blank' rel='noreferrer'>Download</a></button>
         <div className='flex flex-col items-center mt-4'>
            <div className='flex flex-col bg-gray-800 px-4 py-2 rounded-xl my-2'>
               <label className='text-center' htmlFor='search'>Search</label>
               <input onChange={updateSearch} className='px-2 rounded-md text-center' type='text' id='search' placeholder='Search for a level'></input>
            </div>
            <table className='table-fixed border-separate bg-gray-900 w-3/4 rounded-lg'>
               <thead className='border-b border-slate-600'>
                  <tr>
                     <th>Level</th>
                     <th>ID</th>
                     <th>Song ID</th>
                  </tr>
               </thead>
               <tbody className='bg-gray-800 text-center'>
                  {filteredLevels.map((level, id) => (
                     <tr className='font-light' key={id}>
                        <td>{level.name}</td>
                        <td>{level.levelID}</td>
                        <td>{level.songID}</td>
                        {admin ? (
                           <button onClick={() => deleteLevel(level.name)} className='px-4 rounded-md m-1 bg-red-600'>DELETE</button>
                        ) : (
                           <>
                           </>
                        )}
                     </tr>
                  ))}
               </tbody>
            </table>
            <h2 className='mt-4'>If you would like a level to be added, send a message <a href='https://garrettlee.ca/feedback' className='text-blue-400 hover:text-blue-200'>here</a> with the level name, ID, song ID, and a download link to the replacement song</h2>
            <h2>it will be added as quickly as possible</h2>
            {admin ? (
            <div className='flex flex-col items-center mt-24 bg-gray-900 border-4 border-gray-800 px-12 mb-8 py-5 rounded-lg'>
               <h2 className='text-center text-2xl font-light'>Admin Panel</h2>
               <div className='flex flex-col items-center mt-4 gap-2'>
                  <label htmlFor='levelName'>Level Name</label>
                  <input className='px-2 py-1 rounded-lg' onChange={updateName} type='text' id='levelName' placeholder='Enter name'></input>
                  <label htmlFor='levelID'>Level ID</label>
                  <input className='px-2 py-1 rounded-lg' onChange={updateLevelID} type='text' id='leveID' placeholder='Enter level ID'></input>
                  <label htmlFor='songID'>Song ID</label>
                  <input className='px-2 py-1 rounded-lg' onChange={updateSongID} type='text' id='songID' placeholder='Enter song ID'></input>
                  <label htmlFor='replacement'>Replacement Link</label>
                  <input className='px-2 py-1 rounded-lg' onChange={updateReplacement} type='text' id='replacement' placeholder='Enter replacement link'></input>
               </div>
               <button onClick={addLevel} className="block mt-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Add Level</button>
            </div>
         ) : (
            <>
            </>
         )}
         </div>
      </div>
   )
}