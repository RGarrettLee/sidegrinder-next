import supabase from '../../db/connection';

export default function nongdb(req, res) {
   async function getDB() {
      await supabase.from('nong-database').select('name, levelID, songID, replacementLink, active')
      .then((result) => {
         res.status(200).json(result['data']);
      })
   }
   
   getDB();
}