import Link from 'next/link';
import { useState, Fragment, useCallback } from 'react';
import { Tab } from '@headlessui/react';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';

import exportOptions from '../utils/particles';

export default function Home() {

  const [pfp] = useState('https://i.imgur.com/jyiS3HP.png');
  const [skills] = useState({
    'Languages': ['JavaScript', 'Python', 'C#'],
    'Front-End': ['React', 'Next.js', 'TailwindCSS', 'Bootstrap 5', 'Handlebars.js', 'EJS', 'HTML5', 'CSS3'],
    'Back-End': ['Express.js', 'Flask', 'FastAPI', 'MySQL', 'MongoDB', 'GraphQL']
  });

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <>
      <Particles 
        id='tsparticles'
        init={particlesInit}
        loaded={particlesLoaded}
        options={exportOptions()}
      />
      <div className="flex flex-col justify-center text-center sm:mt-auto">
        <h1 className='text-2xl font-semibold'>Garrett Lee</h1>
        <h2 className='text-xl font-thin mt-1'>Full-Stack Developer</h2>
        <div className='flex flex-row justify-center items-center gap-4 sm:gap-14 mt-10'>
          <Link href='portfolio'><button className='font-semibold py-4 px-12 bg-gradient-to-br from-gray-600 to-black hover:animate-pulse w-40 rounded-lg shadow-md shadow-black'>Portfolio</button></Link>
          <img className='hidden sm:block rounded-full h-full p-0.5 bg-gradient-to-tl from-blue-600 via-rose-700 via-purple-900 via-red-500 to-blue-600 animate-gradient' src={pfp} alt='pfp'></img>
          <a target='_blank' rel='noreferrer' href='https://read.cv/rgarrettlee'><button className='font-semibold py-4 px-12 bg-gradient-to-bl from-gray-600 to-black hover:animate-pulse w-40 rounded-lg shadow-md shadow-black'>Resume</button></a>
        </div>
        <div className='mt-6 sm:h-72'>
          <h2 className='text-lg font-semibold'>Proficiencies</h2>
          <Tab.Group as='div' className='mt-1 flex flex-col items-center mb-4'>
            <Tab.List className='flex gap-3 justify-center bg-gradient-to-t from-gray-600 p-2 rounded-lg shadow-md shadow-black'>
              {Object.keys(skills).map((prof, index) => (
                <Tab as={Fragment} key={index} className='p-2 rounded-lg'>
                {({ selected }) => (
                  <button className={selected ? 'bg-black focus:outline-none focus:ring-2 ring-gray-300 ease-linear duration-150 transition-colors' : 'hover:bg-gray-500 ease-linear duration-150 transition-colors'}>{prof}</button>
                )}
              </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className='flex justify-center'>
              {Object.keys(skills).map((skill, index) => (
                <Tab.Panel className='bg-gradient-to-b from-gray-600 p-4 mt-2 w-72 rounded-lg shadow-md shadow-black' key={index}>
                  {skills[skill].map((skill, index) => (
                    <h3 className='text-md font-thin text-xl' key={index}>{skill}</h3>
                  ))}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  )
}

/*

        <div className="flex justify-center align-center text-center flex-col pb-10">
          <h1 className="text-3xl font-bold">Garrett Lee</h1>
          <h2 className='font-thin text-lg mt-2'>Full-Stack Web Developer</h2>
        </div>
        <div className='flex flex-col justify-center items-center bg-slate-700 rounded-xl text-center'>
          <div className='grid grid-cols-3 mb-12'>
            <button className='mt-16 py-6 bg-slate-800 hover:bg-slate-600 rounded-lg w-80'>Portfolio</button>
            <img className='mt-4 rounded-full ml-28' src='https://i.imgur.com/jyiS3HP.png'></img>
            <button className='mt-16 py-6 bg-slate-800 hover:bg-slate-600 rounded-lg w-80'>Resume</button>
          </div>
          <h2 className='px-64 pt-64 pb-56 mb-10 bg-slate-300 rounded-lg'>ABOUT ME</h2>
        </div>
        
*/