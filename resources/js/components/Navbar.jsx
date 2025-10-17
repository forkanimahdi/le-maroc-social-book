import React, { useState, useEffect } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <a href="#accueil" className={`font-semibold tracking-wide transition-colors ${scrolled ? 'text-royal-red' : 'text-white'}`}>Le Maroc Social 2030</a>
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <a href="#livre" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Le Livre</a>
                    <a href="#autrice" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>L'Autrice</a>
                    <a href="#boite-idees" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Boîte à Idées</a>
                    <a href="#groupes" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Groupes</a>
                    <a href="#podcast" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Podcast</a>
                    <a href="#newsletter" className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Newsletter</a>
                </div>
            </div>
        </nav>
    );
}


