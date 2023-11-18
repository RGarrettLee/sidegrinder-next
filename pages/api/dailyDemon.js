import supabase from '../../db/connection';

export default function DailyDemon(req, res) {
   let daily = {name: 'daily'};

   async function pushDemon(data, res) {
      const { error } = await supabase.from('dailies').update({data: data}).eq('type', 'demon');
      res.status(200).json(error);
   }

   async function returnDaily(res) {
      let d = {};
      const data = await supabase.from('dailies').select('data').eq('type', 'demon')
         .then((response) => {
            d = response.data[0].data;
         })
      res.status(200).json(d);
   }

   if (req.body) {
      pushDemon(req.body, res);
   } else {
      returnDaily(res);
   }
}