import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from '../components/projectCard';
import supabase from '../db/connection';

// Move to a resume page thats linked on the projects page
// move all this V V V
// display frontend and backend proficiencies
// other software and language skills too

export default function Portfolio() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const data = await supabase
            .from('projects')
            .select('name, description, preview, repo, deployment, tags')

            setProjects(data['data']);
        }

        getProjects();
    }, []);

    return (
        <div>
            <div className="flex justify-center py-15 flex-col">
                <h2 className="text-center text-2xl">My Portfolio</h2>
            </div>
            {/*<Link href='resume'><button className="block mx-auto mt-4 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Resume</button></Link>*/}
            <p className='text-center font-thin text-lg'>The site is undergoing a design revamp, but this is here for prospective employers</p>
            <div className="pt-12 px-40 grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <ProjectCard project={project} key={`project ${index}`}></ProjectCard>
                ))}
            </div>
        </div>
    )
}