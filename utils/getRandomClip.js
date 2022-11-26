import supabase from '../db/connection';

async function getRandomClip() {
    try {
        console.log('trying to get clip');
        const data = await supabase
        .from('clips')
        .select('url')

        let clips = [];
        for (let i = 0; i < data['data'].length; ++i) {
            clips.push(data['data'][i]['url']);
        }

        console.log(clips);

        return clips[Math.floor(Math.random() * clips.length)];
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}

export default getRandomClip;