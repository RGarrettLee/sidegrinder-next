import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import supabase from '../db/connection';

export default function CSVStuff() {
   const [data, setData] = useState([]);
   const [csv, setCSV] = useState('');
   const [keywords, setKeywords] = useState([]);

   useEffect(() => {
      async function getKeywords() {
         await supabase.from('keywords').select('keyword')
            .then((result) => {
               let data = [];
               result['data'].forEach((entry) => data.push(entry['keyword']));
               setKeywords(data);
            })
      }

      getKeywords();
   }, [])

   function truncate(str, maxLength) {
      return (str.length > maxLength) ? str.slice(0, maxLength - 1) + '...' : str;
   }

   function downloadCSV () {
      let blob = new Blob([csv], {
         type: 'text/csv'
      });

      let filename = 'output.csv';
      saveAs(blob, filename);
   }

   function uploadedFile(event) {
      let csv = event.target.files[0];

      const reader = new FileReader();

      reader.readAsText(csv, "UTF-8");

      reader.onload = function(event) {
         let data = Papa.parse(reader.result);
         setData(data);

         let headers = [1, 4, 8, 0];

         let eligibleCompanies = [];
         let newCSV = '"company name","type","phone number","maps"\n';

         for (let i = 0; i < data['data'].length; i++) { // indexes we want: 0 (maps), 1 (company name), 4 (type), 8 (phone number)
            let entry = data['data'][i];
            if (entry.length >= 20) { // only take rows with 20+ entries
               headers.forEach((index) => {
                  if (entry[index] === "") { // if empty cell, replace with N/A
                     console.log('N/A');
                  } else { // check [1] and [4] indexes for keywords to include or exclude
                     if (index === 1 || index === 4) {
                        if (entry[index].includes("+LLC/data")) { // some [1] indexes have LLC data, if so, skip and take next index for the name
                           keywords.forEach((keyword) => {
                              if (entry[index + 1].toLowerCase().includes(keyword)) {
                                 if (eligibleCompanies.indexOf(i) === -1) {
                                    eligibleCompanies.push(i);
                                    let maps = entry[0].replace('\n', '').replace('"', '');
                                    newCSV += `${entry[1]},${entry[4]},${entry[8]},${maps}\n`
                                 }
                              }
                           })
                        } else {
                           keywords.forEach((keyword) => {
                              if (entry[index].toLowerCase().includes(keyword)) {
                                 if (eligibleCompanies.indexOf(i) === -1) {
                                    eligibleCompanies.push(i);
                                    let maps = entry[0].replace('\n', '').replace('"', '');
                                    newCSV += `${entry[1]},${entry[4]},${entry[8]},${maps}\n`
                                 }
                              }
                           })
                        }
                     }
                  }
               })
            }
         }

         let newcsv = Papa.parse(newCSV);
         setData(newcsv['data']);
         setCSV(newCSV);
      }
   }

   return (
      <>
         <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl'>CSV Stuff for Rohit</h2>
            <label htmlFor="upload" className='block mt-4 mb-8 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded hover:cursor-pointer'>Upload CSV</label>
            <input type="file" id="upload" onChange={uploadedFile} className='hidden'></input>
         </div>
         <div className='flex flex-col gap-24'>
            {data.length === 0 ? (
               <></>
            ) : (
               <div className='flex flex-col items-center'>
                  <button onClick={downloadCSV} className='block mt-4 mb-8 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Download CSV</button>
                  <table className='table-fixed border-separate bg-gray-900 w-3/4 mt-3 mb-4'>
                     <thead className='border-b border-slate-600'>
                        <tr>
                           {data[0].map((header, id) => (
                              <th key={id}>{header}</th>
                           ))}
                        </tr>
                     </thead>
                     <tbody className='bg-gray-800 text-center'>
                        {data.map((row, id) => (
                           <>
                              {id !== 0 ? (
                                 <tr className='font-light' key={id}>
                                    {row.map((data, col) => (
                                       <td key={col}>{truncate(data, 40)}</td>
                                    ))}
                                 </tr>
                              ) : (
                                 <></>
                              )}
                           </>
                        ))}
                     </tbody>
                  </table>
               </div>
            )}
         </div>
      </>
   )
}

/*

let user upload csv file to parse & re-output like the python file

show new csv in table

*/
