import supabase from '../db/connection';

async function getRandomClip() {
    try {
        console.log('trying to get clip');
        const data = await supabase
        .from('clips')
        .select('url')

        return data['data'][Math.floor(Math.random() * data['data'].length)]['url'];
    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}

export default getRandomClip;