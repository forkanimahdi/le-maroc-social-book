import React, { useState, useEffect } from 'react';
import AppLogo from './app-logo.tsx';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        setMobileMenuOpen(false); // Close mobile menu on click
        const element = document.querySelector(targetId);
        if (element) {
            const offsetTop = element.offsetTop - 64; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    const navLinks = [
        { href: '#livre', label: 'Le Livre' },
        { href: '#autrice', label: 'L\'Auteure' },
        { href: '#groupes', label: 'Le Think Tank' },
        { href: '#podcast', label: 'Le Podcast' },
        { href: '#boite-idees', label: 'Vos Recommandations' },
        { href: '#newsletter', label: 'La Newsletter' },
    ];

    return (
        <nav className={`fixed inset-x-0 top-0 z-50 backdrop-blur transition-all duration-300 ${scrolled ? 'bg-white' : 'bg-transparent'}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <a href="#accueil" onClick={(e) => handleSmoothScroll(e, '#accueil')} className={`font-semibold tracking-wide transition-colors ${scrolled ? 'text-royal-red' : 'text-white'}`}>
                    <AppLogo scrolled={scrolled} />
                </a>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks.map((link) => (
                        <a 
                            key={link.href}
                            href={link.href} 
                            onClick={(e) => handleSmoothScroll(e, link.href)} 
                            className={`transition-colors ${scrolled ? 'text-royal-red hover:text-royal-red/80' : 'text-white hover:text-white/80'}`}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-royal-red' : 'text-white'}`}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className={`md:hidden absolute top-16 left-0 right-0 backdrop-blur-lg border-t transition-all duration-300 ${scrolled ? 'bg-white border-zinc-200' : 'bg-white/95 border-white/20'}`}>
                    <div className="mx-auto max-w-6xl px-4 py-4 space-y-2">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={(e) => handleSmoothScroll(e, link.href)}
                                className="block py-3 px-4 rounded-lg text-sm font-medium transition-colors hover:bg-royal-red-soft"
                                style={{ color: 'var(--royal-red)' }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}


