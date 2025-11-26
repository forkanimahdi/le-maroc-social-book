import React, { useEffect } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import Book from '../components/Book.jsx';
import Author from '../components/Author.jsx';
import Groups from '../components/Groups.jsx';
import Podcast from '../components/Podcast.jsx';
import IdeasBox from '../components/IdeasBox.jsx';
import Newsletter from '../components/Newsletter.jsx';
import ContactSection from '../components/ContactSection.jsx';
import FlashMessage from '../components/ui/FlashMessage.jsx';

export default function Home({ ideas = [], episodes = [], content = null }) {
    // Ajoute un léger fondu à l'arrivée de la page
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-[#fdcfa2] text-zinc-800">
            <FlashMessage />
            <Navbar />
            <Hero />

            <main className="flex-1">
                <section id="livre" className="scroll-mt-24"><Book /></section>
                <section id="autrice" className="scroll-mt-24"><Author content={content} /></section>
                <section id="groupes" className="scroll-mt-24"><Groups /></section>
                <section id="podcast" className="scroll-mt-24"><Podcast episodes={episodes} /></section>
                <section id="boite-idees" className="scroll-mt-24"><IdeasBox ideas={ideas} /></section>
                <ContactSection />
                <section id="newsletter" className="scroll-mt-24"><Newsletter /></section>
            </main>

            <Footer />
        </div>
    );
}


