import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { RealGlitchOverlay } from './PageTransition';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showGlitch, setShowGlitch] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        setShowGlitch(true);
    };

    const getLinkClass = (path) => {
        const isActive = location.pathname === path;
        const baseClass = "transition-colors duration-100 active:translate-x-1 active:translate-y-1 px-4 py-2 text-sm lg:text-base whitespace-nowrap font-bold ";
        return baseClass + (isActive 
            ? "bg-primary text-background border-2 border-primary neo-shadow" 
            : "text-primary hover:bg-primary hover:text-background border-2 border-transparent");
    };

    const getMobileLinkClass = (path) => {
        const isActive = location.pathname === path;
        const baseClass = "p-6 border-b-4 border-primary font-headline font-bold text-xl flex items-center justify-between transition-colors ";
        return baseClass + (isActive 
            ? "bg-primary text-background" 
            : "text-primary hover:bg-primary hover:text-background");
    };

    return (
        <>
            <nav className="bg-background dark:bg-primary text-primary dark:text-primary-fixed font-headline uppercase tracking-tighter font-black w-full top-0 border-b-4 border-primary dark:border-primary-fixed hidden md:flex justify-between items-center px-4 lg:px-6 py-4 max-w-full z-50 relative sticky">
                <div className="font-headline font-black text-2xl lg:text-3xl tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis mr-4">
                    <span>JYOTISHMAN_SAIKIA</span>
                </div>
                <div className="flex gap-4 lg:gap-8 items-center overflow-x-auto no-scrollbar py-2">
                    <Link className={getLinkClass('/')} to="/">HOME</Link>
                    <Link className={getLinkClass('/projects')} to="/projects">PROJECTS</Link>
                    <Link className={getLinkClass('/about')} to="/about">ABOUT</Link>
                    <Link className={getLinkClass('/contact')} to="/contact">CONTACT</Link>
                </div>
                <Link to="/contact" className="ml-4 flex-shrink-0">
                    <button className="bg-primary text-background border-2 border-primary font-bold px-4 lg:px-6 py-2 hover:bg-secondary hover:text-primary text-sm lg:text-base whitespace-nowrap neo-shadow neo-shadow-hover">
                        GET IN TOUCH
                    </button>
                </Link>
            </nav>

            {/* SideNavBar (Mobile Top Nav) */}
            <nav className="md:hidden flex justify-between items-center w-full px-4 py-4 bg-background border-b-4 border-primary sticky top-0 z-50">
                <div className="text-lg sm:text-xl font-black text-primary font-headline tracking-tighter truncate mr-2">
                    <Link to="/">JYOTISHMAN_SAIKIA</Link>
                </div>
                <button 
                    onClick={toggleMobileMenu}
                    className="material-symbols-outlined text-4xl text-primary p-2 border-2 border-primary neo-shadow neo-shadow-hover"
                >
                    {isMobileMenuOpen ? 'close' : 'menu'}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`${isMobileMenuOpen ? 'flex' : 'hidden'} fixed inset-0 bg-background z-40 border-r-4 border-primary pt-20 flex-col`} style={{ marginTop: '76px' }}>
                <div className="p-6 border-b-4 border-primary text-center">
                    <div className="font-headline font-black text-2xl text-primary tracking-tighter">JYOTISHMAN_SAIKIA</div>
                    <div className="font-body text-sm font-bold mt-1">2024_EDITION</div>
                </div>
                <div className="flex-grow flex flex-col">
                    <Link onClick={toggleMobileMenu} className={getMobileLinkClass('/')} to="/">
                        <span>HOME</span>
                        <span className="material-symbols-outlined">home</span>
                    </Link>
                    <Link onClick={toggleMobileMenu} className={getMobileLinkClass('/projects')} to="/projects">
                        <span>PROJECTS</span>
                        <span className="material-symbols-outlined">folder_open</span>
                    </Link>
                    <Link onClick={toggleMobileMenu} className={getMobileLinkClass('/about')} to="/about">
                        <span>ABOUT</span>
                        <span className="material-symbols-outlined">info</span>
                    </Link>
                    <Link onClick={toggleMobileMenu} className={getMobileLinkClass('/contact')} to="/contact">
                        <span>CONTACT</span>
                        <span className="material-symbols-outlined">edit_note</span>
                    </Link>
                </div>
                <div className="p-6 mt-auto border-t-4 border-primary">
                    <Link to="/contact" onClick={toggleMobileMenu}>
                        <button className="w-full bg-secondary text-primary border-2 border-primary font-headline font-bold text-xl py-4 uppercase neo-shadow neo-shadow-hover">
                            GET IN TOUCH
                        </button>
                    </Link>
                </div>
            </div>

            <AnimatePresence>
                {showGlitch && <RealGlitchOverlay onComplete={() => setShowGlitch(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
