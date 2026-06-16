import Terminal from '../components/Terminal';
import PageTransition from '../components/PageTransition';

const About = () => {
    return (
        <PageTransition className="flex w-full min-h-[calc(100vh-76px)] relative bg-primary overflow-hidden group">
            
            {/* Vintage Coder Background Image */}
            <img alt="Retro coding monitor" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105" src="/assets/coder_bg.png"/>

            {/* Terminal Container - Centered */}
            <div className="relative z-20 w-full max-w-[calc(100vw-2rem)] md:max-w-4xl lg:max-w-5xl xl:max-w-6xl px-1 py-4 md:p-8 mx-auto my-auto flex flex-col justify-center min-h-full">
                <Terminal />
            </div>

        </PageTransition>
    );
};

export default About;
