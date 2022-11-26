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
            <div className="flex justify-center py-5">
                <iframe width="640" height="360" className="border-none" src={clip} allow="autoplay" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default RandomClip;