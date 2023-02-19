
export default function ProjectCard({ project }) {
    const { name, description, preview, repo, deployment, tags } = project;

    return (
        <div className="max-w-sm sm:w-auto rounded-lg overflow-hidden shadow-md bg-gradient-to-tl from-gray-700 shadow-black">
            <figure>
                {/*<img className="w-full rounded-md h-auto invisible sm:visible" src={preview} alt="project image"></img>*/}
            </figure>
            <div className="px-6 py-4">
                <div className="font-bold text-center text-xl mb-2">{name}</div>
                <p className="text-gray-400 text-base text-center">
                    {description}
                </p>
            </div>
            <div className="px-6 pt-2 flex flex-row justify-center">
                <a href={repo} target="_blank" rel="noreferrer"><span className="inline-block mr-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-600 rounded ease-linear duration-150 transition-colors">GitHub</span></a>
                <a href={deployment} target="_blank" rel="noreferrer"><span className="inline-block bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-600 rounded ease-linear duration-150 transition-colors">Deployed Link</span></a>
            </div>
            <div className="px-6 pt-4 pb-2 flex flex-row justify-center">
                {tags.map((tag, index) => (
                    <span className="inline-block hover:cursor-default select-none bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={`tag ${index}`}>{`#${tag}`}</span>
                ))}
            </div>
        </div>
    )
}