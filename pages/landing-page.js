

export default function LandingPage() {

   return (
       <>
         <div className="flex justify-center align-center flex-col pb-20 bg-black">
           <h1 className="text-3xl text-center font-bold">Garrett Lee</h1>
         </div>
         <div className='flex flex-col justify-center items-center bg-slate-700 rounded-xl text-center'>
           {/* put styled part of page here with portfolio/resume/about me/skills save image of myself for resume/portfolio */}
           <div className='grid grid-cols-3 mb-12'>
             <button className='mt-16 py-6 bg-slate-800 hover:bg-slate-600 rounded-lg w-80'>Portfolio</button>
             <h2 className='mt-4'>Image of myself</h2>
             <button className='mt-16 py-6 bg-slate-800 hover:bg-slate-600 rounded-lg w-80'>Resume</button>
           </div>
           <h2 className='px-64 pt-64 pb-56 mb-10 bg-slate-300 rounded-lg'>ABOUT ME</h2>
         </div>
         <footer className='block text-center'>
           <span className='font-extralight'>Made with ❤️ and React</span>
         </footer>
     </>
   )
 }
 