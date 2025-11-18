import React, { useState, useEffect } from 'react';
import AppLogo from './app-logo.tsx';



export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const offsetTop = element.offsetTop - 64; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <a href="#accueil" onClick={(e) => handleSmoothScroll(e, '#accueil')} className={`font-semibold tracking-wide transition-colors ${scrolled ? 'text-royal-red' : 'text-white'}`}><AppLogo scrolled={scrolled} /></a>
                <div className="hidden md:flex items-center gap-6 text-sm">
                    <a href="#livre" onClick={(e) => handleSmoothScroll(e, '#livre')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Le Livre</a>
                    <a href="#autrice" onClick={(e) => handleSmoothScroll(e, '#autrice')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>L'Auteure</a>
                    <a href="#groupes" onClick={(e) => handleSmoothScroll(e, '#groupes')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Le Think Tank</a>
                    <a href="#podcast" onClick={(e) => handleSmoothScroll(e, '#podcast')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Le Podcast</a>
                    <a href="#boite-idees" onClick={(e) => handleSmoothScroll(e, '#boite-idees')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>Vos Recommandations</a>
                    <a href="#newsletter" onClick={(e) => handleSmoothScroll(e, '#newsletter')} className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}>La Newsletter</a>
                </div>
            </div>
        </nav>
    );
}


