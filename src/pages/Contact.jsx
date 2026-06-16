import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Format the message for WhatsApp
        const emailLine = email ? `%0A*Email:* ${email}` : '';
        const text = `Hello Jyotishman!%0A%0A*Name:* ${name}${emailLine}%0A*Message:* ${message}`;

        // Add your WhatsApp number here (include country code, e.g., 919876543210 for India)
        const waNumber = import.meta.env.VITE_WA_NUMBER;

        window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <PageTransition className="flex flex-col w-full relative bg-background overflow-hidden">
            {/* Background Marquee / Watermark */}
            <div className="absolute top-10 -left-10 text-[15rem] md:text-[25rem] font-headline font-black text-surface-tint opacity-5 leading-none pointer-events-none select-none whitespace-nowrap overflow-hidden">
                CONTACT CONTACT
            </div>

            <div className="flex-grow p-6 md:p-12 lg:p-24 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
                <header className="mb-12 md:mb-16">
                    <h1 className="font-display font-black text-7xl md:text-9xl tracking-tighter uppercase leading-none text-primary break-words">
                        SAY<br />HELLO<span className="text-secondary">.</span>
                    </h1>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 w-full items-start">

                    {/* Form Section */}
                    <section className="w-full lg:col-span-7 xl:col-span-8">
                        <form className="flex flex-col gap-6 md:gap-8" onSubmit={handleSubmit}>
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                <div className="relative flex-1">
                                    <label className="font-headline font-black uppercase text-xl md:text-2xl tracking-tighter text-primary block mb-3" htmlFor="name">Name</label>
                                    <input className="w-full bg-white border-2 border-primary text-xl md:text-2xl font-headline font-bold text-primary p-4 md:p-6 placeholder-surface-dim focus:bg-primary focus:text-background focus:outline-none transition-colors neo-shadow" id="name" name="name" placeholder="JOHN DOE" required type="text" />
                                </div>
                                <div className="relative flex-1">
                                    <label className="font-headline font-black uppercase text-xl md:text-2xl tracking-tighter text-primary block mb-3" htmlFor="email">Email <span className="text-sm text-surface-dim font-bold">(Optional)</span></label>
                                    <input className="w-full bg-white border-2 border-primary text-xl md:text-2xl font-headline font-bold text-primary p-4 md:p-6 placeholder-surface-dim focus:bg-primary focus:text-background focus:outline-none transition-colors neo-shadow" id="email" name="email" placeholder="HELLO@EXAMPLE.COM" type="email" />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="font-headline font-black uppercase text-xl md:text-2xl tracking-tighter text-primary block mb-3" htmlFor="message">Message</label>
                                <textarea className="w-full bg-white border-2 border-primary text-xl md:text-2xl font-headline font-bold text-primary p-4 md:p-6 placeholder-surface-dim focus:bg-primary focus:text-background focus:outline-none transition-colors resize-none neo-shadow h-48 md:h-64" id="message" name="message" placeholder="TELL ME EVERYTHING." required></textarea>
                            </div>

                            <div className="mt-4">
                                <button className="w-full md:w-auto inline-flex bg-secondary text-primary font-headline font-black text-2xl md:text-3xl uppercase tracking-tighter px-12 py-6 border-2 border-primary items-center justify-between gap-8 hover:bg-primary hover:text-secondary neo-shadow neo-shadow-hover transition-all group" type="submit">
                                    <span>SEND MESSAGE</span>
                                    <span className="material-symbols-outlined text-4xl group-hover:translate-x-2 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Solid Black Sidebar Section */}
                    <aside className="w-full lg:col-span-5 xl:col-span-4 bg-primary text-background border-2 border-primary p-8 md:p-12 flex flex-col gap-12 neo-shadow transform lg:-rotate-1">
                        <div>
                            <h3 className="font-headline font-bold uppercase text-sm tracking-widest text-secondary mb-4 border-b-2 border-secondary pb-2 inline-block">Direct Contact</h3>
                            <a className="font-headline font-black text-2xl md:text-3xl text-background hover:text-secondary transition-colors block break-all leading-tight" href="mailto:jyotishmansaikia.web@gmail.com">
                                jyotishmansaikia<br />.web@gmail.com
                            </a>
                        </div>

                        <div>
                            <h3 className="font-headline font-bold uppercase text-sm tracking-widest text-secondary mb-4 border-b-2 border-secondary pb-2 inline-block">Location</h3>
                            <p className="font-headline font-black text-2xl md:text-3xl text-background uppercase leading-tight">
                                ASSAM,<br />
                                INDIA
                            </p>
                        </div>

                        <div>
                            <h3 className="font-headline font-bold uppercase text-sm tracking-widest text-secondary mb-6 border-b-2 border-secondary pb-2 inline-block">Social Profiles</h3>
                            <div className="flex flex-col gap-4">
                                <Link className="bg-background text-primary border-2 border-background font-headline font-black text-xl px-6 py-4 flex items-center justify-between uppercase hover:bg-secondary hover:text-primary hover:border-secondary neo-shadow-light neo-shadow-light-hover transition-all group" to="/404">
                                    <span>GITHUB</span>
                                    <span className="material-symbols-outlined text-3xl group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </Link>
                                <a className="bg-background text-primary border-2 border-background font-headline font-black text-xl px-6 py-4 flex items-center justify-between uppercase hover:bg-secondary hover:text-primary hover:border-secondary neo-shadow-light neo-shadow-light-hover transition-all group" href="https://www.linkedin.com/in/jyotishman-saikia-a1248a411?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer">
                                    <span>LINKEDIN</span>
                                    <span className="material-symbols-outlined text-3xl group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </a>
                                <Link className="bg-background text-primary border-2 border-background font-headline font-black text-xl px-6 py-4 flex items-center justify-between uppercase hover:bg-secondary hover:text-primary hover:border-secondary neo-shadow-light neo-shadow-light-hover transition-all group" to="/404">
                                    <span>TWITTER</span>
                                    <span className="material-symbols-outlined text-3xl group-hover:rotate-45 transition-transform">arrow_outward</span>
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;
