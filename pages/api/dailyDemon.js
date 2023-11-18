import supabase from '../../db/connection';

export default function DailyDemon(req, res) {
   let daily = {name: 'daily'};

   async function pushDemon(data) {
      const { error } = await supabase.from('dailies').update({data: data}).eq('type', 'demon');
   }

   if (req.body) {
      pushDemon(req.body);
      daily = req.body;
      res.status(200).json(req.body);
   } else {
      res.status(200).json({response: daily});
   }
}