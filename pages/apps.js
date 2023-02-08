import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Apps() {
   const [apps, setApps] = useState([]);

   useEffect(() => {
      setApps([
         {link: 'chaos-format', name: 'Chaos Format'},
         {link: 'proxy-deck', name: 'Proxy Tracking'}
         /*{link: 'memory-gauge', name: 'Memory Gauge'}
         {link: 'dwc-tracker', name: 'Digimon World Championship Tracker'}*/
      ])
   }, []);

   return (
      <>
         <h1 className="text-center text-2xl">Apps hosted on this site</h1>
         <div className="flex justify-center">
            <ul className="text-center mt-5">
               {apps.map((app, index) => (
                  <div key={`card ${index}`}>
                     <Link href={app.link}><li className="hover:text-blue-200 font-light text-xl">{app.name}</li></Link>
                  </div>
               ))}
            </ul>
         </div>
      </>
   )
}