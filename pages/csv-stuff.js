import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

export default function CSVStuff() {
   const [data, setData] = useState([]);
   const [csv, setCSV] = useState('');
   const [keywords, setKeywords] = useState([]);
   const [headers, setHeaders] = useState([]);
   const [useHeaders, setUseHeaders] = useState([]);
   const [parseHeaders, setParseHeaders] = useState([]);
   const [parsed, setParsed] = useState(false);

   function truncate(str, maxLength) {
      return (str.length > maxLength) ? str.slice(0, maxLength - 1) + '...' : str;
   }

   function downloadCSV() {
      let blob = new Blob([csv], {
         type: 'text/csv'
      });

   function parseNew() {
      window.location.reload();
   }
      let filename = 'output.csv';
      saveAs(blob, filename);
   }

   function headerCheckbox(event) {
      let pos = headers.indexOf(event.target.id);
      let use = useHeaders;
      use[pos] = !use[pos];
      setUseHeaders(use);
   }

   function parseCheckbox(event) {
      let pos = parseHeaders.indexOf(event.target.id);
      let use = parseHeaders;
      use[pos] = !use[pos];
      setParseHeaders(use);
   }

   function uploadedKeywords(event) {
      let keywords = event.target.files[0];

      const reader = new FileReader();
      reader.readAsText(keywords, "UTF-8");

      reader.onload = function(event) {
         let data = reader.result.split(/\r?\n/);
         setKeywords(data);
      }
   }

   function uploadedFile(event) {
      let csv = event.target.files[0];

      const reader = new FileReader();

      reader.readAsText(csv, "UTF-8");

      reader.onload = function(event) {
         let data = Papa.parse(reader.result);
         let headerLength = [];

         for (let i = 0; i < data['data'][0].length; i++) {
            headerLength.push(false);
         }

         setData(data['data']);
         setHeaders(data['data'][0]);
         setUseHeaders(headerLength);
         setParseHeaders(headerLength);
      }
   }

   function parseCSV() {
      setParsed(true);

      let eligibleCompanies = [];
      let newCSV = '';
      for (let i = 0; i < headers.length; i++) {
         if (useHeaders[i]) {
            newCSV += `"${headers[i]}",`;
         }
      }
      
      newCSV = newCSV.slice(0, -1);
      newCSV += '\n';

      let checkHeaders = [];

      for (let i = 0; i < parseHeaders.length; i++) {
         if (parseHeaders[i]) {
            checkHeaders.push(i);
         }
      }

      for (let i = 0; i < data.length; i++) {
         let entry = data[i];
         headers.forEach((index) => {
            let ind = headers.indexOf(index);
            if (checkHeaders.includes(ind)) {
               if (entry.length > 5) {
                  keywords.forEach((keyword) => {
                     if (entry[ind].toLowerCase().includes(keyword)) {
                        if (eligibleCompanies.indexOf(i) === -1) {
                           eligibleCompanies.push(i);
                           for (let i = 0; i < useHeaders.length; i++) {
                              if (useHeaders[i]) {
                                 let sanitized = entry[i].replace('"', '').replace('\n', '');
                                 newCSV += `${sanitized},`;
                              }
                           }
                           newCSV = newCSV.slice(0, -1);
                           newCSV += '\n';
                        }
                     }
                  })
               }
            }
         })
      }

      let newcsv = Papa.parse(newCSV);
      setData(newcsv['data']);
      setCSV(newCSV);
   }

   return (
      <>
         <div className='flex flex-col items-center'>
            <h2 className='text-center text-2xl'>CSV Stuff for Rohit</h2>
            <h3 className='text-center text-md font-light'>Reload page to parse other files</h3>
         </div>
         <div className='flex flex-col items-center'>
            {keywords.length === 0 || data.length === 0 ? (
               <div className='flex gap-12'>
                  <label htmlFor="uploadCSV" className='block mt-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded hover:cursor-pointer'>Upload CSV</label>
                  <input type="file" id="uploadCSV" onChange={uploadedFile} className='hidden'></input>
                  <label htmlFor="uploadKeywords" className='block mt-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded hover:cursor-pointer'>Upload Keywords</label>
                  <input type="file" id="uploadKeywords" onChange={uploadedKeywords} className='hidden'></input>
               </div>
            ) : (
               <>
                  {!parsed ? (
                     <div className='mt-8'>
                        <div className='flex flex-col items-center overflow-x-auto'>
                           <h2 className='text-2xl mb-4'>Select the headers you want to collect</h2>
                           <div className='flex bg-gray-900 mx-4 my-2 rounded-lg'>
                              {headers.map((header, key) => (
                                 <div className='flex flex-col items-center justify-center my-4' key={key}>
                                    <label htmlFor="check" className="mx-4">{header}</label>
                                    <input type="checkbox" id={header} onClick={headerCheckbox}></input>
                                 </div>
                              ))}
                           </div>
                           <h2 className='text-2xl mb-4 mt-4'>Select the headers you want to find keywords on</h2>
                           <div className='flex bg-gray-900 mx-4 my-2 rounded-lg'>
                              {headers.map((header, key) => (
                                 <div className='flex flex-col items-center justify-center my-4' key={key}>
                                    <label htmlFor="check" className="mx-4">{header}</label>
                                    <input type="checkbox" id={parseHeaders} onClick={parseCheckbox}></input>
                                 </div>
                              ))}
                           </div>
                           <button onClick={parseCSV} className='block mt-4 mb-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Parse CSV</button>
                           <caption className='text-xl font-light mb-2 mt-4'>
                              Original CSV
                           </caption>
                           <table className='table-auto border-separate bg-gray-900 w-5/6 mt-3 mb-4 rounded-lg'>
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
                                                <td key={col}>{truncate(data, 15)}</td>
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
                     </div>
                  ) : (
                     <div className='flex flex-col items-center'>
                        <div className='flex gap-12'>
                           <button onClick={downloadCSV} className='block mt-4 mb-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Download CSV</button>
                           <button onClick={parseNew} className='block mt-4 mb-4 mx-auto bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded'>Parse another CSV</button>
                        </div>
                        <table className='table-auto border-separate bg-gray-900 w-5/6 mt-3 mb-4 rounded-lg'>
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
               </>
            )}
         </div>
      </>
   )
}
