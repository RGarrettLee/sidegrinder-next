const RandomClip = function() {
    let randomClip = 'https://medal.tv/games/valorant/clip/F05Nv92xHXtZe/XVCEmASX44BB?invite=cr-MSwyY2gsMTE5MDkxNDk0LA';

    return (
        <div>
            <div className="flex justify-center align-center flex-col text-center">
                <h1 className="text-2xl">Enjoy a random clip</h1>
            </div>
            <div className="flex justify-center py-5">
                <iframe width="640" height="360" className="border-none" src={randomClip} allow="autoplay" allowFullScreen></iframe>
            </div>
        </div>
    )
}

export default RandomClip;