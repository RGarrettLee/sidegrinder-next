import { useEffect, useState, useCallback } from 'react';
import { loadFull } from 'tsparticles';
import ProjectCard from '../components/projectCard';
import supabase from '../db/connection';
import Particles from 'react-particles';
import exportOptions from '../utils/particles';

export default function Portfolio() {
    const [projects, setProjects] = useState([]);

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadFull(engine);
      }, []);
    
      const particlesLoaded = useCallback(async container => {
        await console.log(container);
      }, []);
    
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
            <Particles 
                id='tsparticles'
                init={particlesInit}
                loaded={particlesLoaded}
                options={exportOptions()}
            />
            <div className="flex flex-col justify-center align-center items-center">
                <h2 className="text-center text-2xl">My Portfolio</h2>
            </div>
            {/*<Link href='resume'><button className="block mx-auto mt-4 bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded">Resume</button></Link>*/}
            <p className='text-center font-thin text-lg'></p>
            <div className="flex flex-col items-center gap-4 py-12">
                {projects.map((project, index) => (
                    <ProjectCard project={project} key={`project ${index}`}></ProjectCard>
                ))}
            </div>
        </div>
    )
}