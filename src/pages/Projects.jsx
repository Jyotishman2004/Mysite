import { projectsData } from '../data/projects';
import PageTransition from '../components/PageTransition';

const Projects = () => {
    return (
        <PageTransition className="flex flex-col min-h-screen">
            <section className="px-6 py-12 md:px-12 md:py-20 border-b-4 border-primary bg-primary text-background">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-headline font-black text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none mb-6">
                        SELECTED<br/><span className="text-secondary">WORKS</span>
                    </h2>
                    <p className="font-body text-lg md:text-xl max-w-2xl text-inverse-primary/80 border-l-4 border-secondary pl-4">
                        A brutalist exploration of form and function. High contrast, strong geometry, deliberate imperfection. 2023—2024 archive.
                    </p>
                </div>
            </section>
            
            <section className="p-6 md:p-12 flex-1 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-4 mb-12 border-b-4 border-primary pb-6">
                        {projectsData.map(project => (
                            <button 
                                key={`label-${project.id}`} 
                                onClick={() => {
                                    const element = document.getElementById(`project-${project.id}`);
                                    if (element) {
                                        const y = element.getBoundingClientRect().top + window.scrollY - 100;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}
                                className="inline-block bg-primary text-background px-6 py-2 font-headline font-bold uppercase text-sm border-2 border-primary neo-shadow neo-shadow-hover cursor-pointer transition-all outline-none"
                            >
                                {project.title}
                            </button>
                        ))}
                    </div>
                    
                    <div className="masonry-grid" style={{ columnCount: 1, columnGap: '2rem' }}>
                        {projectsData.map((project) => (
                            <a id={`project-${project.id}`} key={project.id} href={project.link} target={project.link !== '#' ? '_blank' : '_self'} rel="noreferrer" className="block outline-none">
                                <article className="masonry-item bg-background border-2 border-primary neo-shadow neo-shadow-hover transition-all group cursor-pointer relative overflow-hidden flex flex-col mb-8 break-inside-avoid">
                                    <div className={`w-full bg-primary-container relative border-b-2 border-primary overflow-hidden ${project.size === 'portrait' ? 'h-[30rem]' : 'h-80'}`}>
                                        <img alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105" src={project.imageUrl}/>
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            <span className="bg-secondary text-white px-3 py-1 font-headline font-bold text-xs uppercase border-2 border-primary">{project.status}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 bg-background group-hover:bg-primary group-hover:text-background transition-colors duration-300 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-headline font-black text-2xl uppercase tracking-tight mb-2">{project.title}</h3>
                                            <p className="font-body text-sm mb-4">{project.category}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-6 pt-4 border-t-2 border-primary group-hover:border-background">
                                            <span className="font-headline font-bold text-sm">VIEW PROJECT</span>
                                            <span className="material-symbols-outlined text-secondary transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                                        </div>
                                    </div>
                                </article>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default Projects;
