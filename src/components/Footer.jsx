import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary dark:bg-surface-container-highest text-background dark:text-primary font-label font-bold uppercase text-xs font-black tracking-widest w-full border-t-4 border-primary dark:border-primary-fixed px-6 py-8 flex flex-col md:flex-row justify-center items-center gap-4 mt-auto">
            <div className="flex gap-6 items-center flex-wrap justify-center">
                <a className="text-background dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary transition-colors hover:italic" href="https://github.com/Jyotishman2004" target="_blank" rel="noopener noreferrer">GITHUB</a>
                <a className="text-background dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary transition-colors hover:italic" href="https://x.com" target="_blank" rel="noopener noreferrer">TWITTER</a>
                <a className="text-background dark:text-on-surface-variant hover:text-secondary dark:hover:text-secondary transition-colors hover:italic" href="https://www.linkedin.com/in/jyotishman-saikia-a1248a411?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
            </div>
        </footer>
    );
};

export default Footer;
