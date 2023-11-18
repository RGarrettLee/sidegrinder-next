import supabase from '../../db/connection';

export default function DailyDemon(req, res) {
   let daily = {name: 'daily'};

   async function pushDemon(data, res) {
      const { error } = await supabase.from('dailies').update({data: data}).eq('type', 'demon');
      res.status(200).json(error);
   }

   if (req.body) {
      pushDemon(req.body, res);
   } else {
      res.status(200).json({response: daily});
   }
}