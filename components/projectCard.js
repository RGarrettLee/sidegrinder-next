

export default function ProjectCard({ project }) {
    const { name, description, preview, repo, deployment, tags } = project;

    return (
        <div className="max-w-sm sm:w-auto rounded-lg overflow-hidden shadow-lg bg-gray-800">
            <figure>
                {/*<img className="w-full rounded-md h-auto invisible sm:visible" src={preview} alt="project image"></img>*/}
            </figure>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-400 text-base">
                    {description}
                </p>
            </div>
            <div className="px-6 pt-4">
                <a href={repo} target="_blank"><span className="inline-block mr-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-600 rounded shadow">GitHub</span></a>
                <a href={deployment} target="_blank"><span className="inline-block bg-gray-700 hover:bg-gray-500 text-white font-semibold py-2 px-4 border border-gray-600 rounded shadow">Deployed Link</span></a>
            </div>
            <div className="px-6 pt-4 pb-2">
                {tags.map((tag, index) => (
                    <span className="inline-block hover:cursor-default select-none bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2" key={`tag ${index}`}>{`#${tag}`}</span>
                ))}
            </div>
        </div>
    )
}