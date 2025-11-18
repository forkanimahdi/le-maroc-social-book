import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function Error404() {
    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const offsetTop = element.offsetTop - 64;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fdcfa2]">
            <Head title="Page non trouvée" />
            <Navbar />
            
            <main className="flex-1 flex items-center justify-center px-4 py-24">
                <div className="text-center max-w-2xl">
                    <div className="mb-8">
                        <h1 className="text-9xl font-bold" style={{ color: 'var(--royal-red)' }}>404</h1>
                    </div>
                    
                    <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--royal-red)' }}>
                        Page non trouvée
                    </h2>
                    
                    <p className="text-xl text-zinc-700 mb-8">
                        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/"
                            className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
                            style={{ backgroundColor: 'var(--royal-red)', color: 'white' }}
                        >
                            Retour à l'accueil
                        </a>
                        <a
                            href="#livre"
                            onClick={(e) => handleSmoothScroll(e, '#livre')}
                            className="px-6 py-3 rounded-lg font-semibold border-2 transition-all"
                            style={{ borderColor: 'var(--royal-green)', color: 'var(--royal-green)' }}
                        >
                            Découvrir le livre
                        </a>
                    </div>
                    
                    <div className="mt-12 pt-8 border-t border-zinc-300">
                        <p className="text-sm text-zinc-600 mb-4">Pages disponibles :</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            {[
                                { href: '#livre', label: 'Le Livre' },
                                { href: '#autrice', label: 'L\'Auteure' },
                                { href: '#groupes', label: 'Le Think Tank' },
                                { href: '#podcast', label: 'Le Podcast' },
                                { href: '#boite-idees', label: 'Vos Recommandations' },
                                { href: '#newsletter', label: 'La Newsletter' },
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleSmoothScroll(e, link.href)}
                                    className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-royal-red-soft"
                                    style={{ color: 'var(--royal-red)' }}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

