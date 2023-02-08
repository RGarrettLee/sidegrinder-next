import { useEffect, useState } from 'react';
import getRandomClip from '../utils/getRandomClip';

const RandomClip = function() {
    const [clip, setClip] = useState('');

    const getClip = async() => {
        const randomClip = await getRandomClip();
        setClip(randomClip);
    }

    useEffect(() => {
        getClip()
    }, []);

    return (
        <div>
            <div className="flex justify-center align-center flex-col text-center">
                <h1 className="text-2xl">Enjoy a random clip</h1>
            </div>
            <div className="flex justify-center py-5 flex-col">
                <iframe width="640" height="360" className="border-none block mx-auto" src={clip} allow="autoplay" allowFullScreen></iframe>
            </div>
            <button onClick={async() => {
                    const random = await getRandomClip();
                    setClip(random);
                }} className="block mx-auto bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-600 rounded shadow" type="button">Shuffle Clip</button>
        </div>
    )
}

export default RandomClip;