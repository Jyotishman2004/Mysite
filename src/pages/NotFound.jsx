import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const NotFound = () => {
    return (
        <PageTransition className="flex flex-col justify-center items-center bg-primary text-background p-6 text-center relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10 flex flex-col items-center">
                <h1 className="font-display font-black text-[25vw] md:text-[15vw] leading-none tracking-tighter drop-shadow-md">
                    404
                </h1>
                <div className="bg-background text-primary font-headline font-black uppercase text-xl md:text-3xl px-6 py-2 -mt-4 md:-mt-8 mb-12 transform -rotate-3 border-4 border-background neo-shadow">
                    System Malfunction
                </div>

                <p className="font-body font-bold text-lg md:text-2xl mb-12 max-w-xl">
                    THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST, HAS BEEN DELETED, OR IS CLASSIFIED.
                </p>

                {/* Button with exact barcode overlay */}
                <div className="relative inline-block mb-12">
                    <Link to="/" style={{ display: 'block' }} className="bg-secondary text-background font-headline font-black text-2xl uppercase tracking-tighter px-12 py-6 border-4 border-background neo-shadow-light neo-shadow-light-hover hover:bg-background hover:text-primary cursor-pointer text-center no-underline relative z-0">
                        RETURN TO INDEX
                    </Link>
                    
                    {/* Decorative Barcode Overlay (Pointer events disabled to allow button clicks) */}
                    <div className="absolute inset-0 flex gap-1 justify-center items-center opacity-40 pointer-events-none z-10 px-8">
                        <div className="bg-background w-2 h-8"></div>
                        <div className="bg-background w-1 h-8"></div>
                        <div className="bg-background w-3 h-8"></div>
                        <div className="bg-background w-1 h-8"></div>
                        <div className="bg-background w-4 h-8"></div>
                        <div className="bg-background w-2 h-8"></div>
                        <div className="bg-background w-8 h-8"></div>
                        <div className="bg-background w-1 h-8"></div>
                        <div className="bg-background w-3 h-8"></div>
                        <div className="bg-background w-2 h-8"></div>
                        <div className="bg-background w-5 h-8"></div>
                        <div className="bg-background w-1 h-8"></div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default NotFound;
