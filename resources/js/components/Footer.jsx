import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#860205] via-[oklch(0.8 0.1 85)] to-[#1b4e0b]">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
                {/* Main Footer Content */}
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Project Info */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold text-gold mb-4">Le Maroc Social 2030</h3>
                        <p className="text-white/90 leading-relaxed mb-6 max-w-md">
                            Une initiative citoyenne pour construire ensemble un Maroc plus inclusif, 
                            solidaire et tourné vers l'avenir.
                        </p>
                        <div className="flex gap-4 mb-6">
                            <a href="https://www.linkedin.com/company/le-maroc-social/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors">
                                <svg className="w-5 h-5 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/lemaroc_social" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors">
                                <svg className="w-5 h-5 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                        </div>
                        
                        {/* Sponsors */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <div className="flex items-center justify-center h-20 brightness-0 invert  opacity-80 hover:opacity-100 transition-opacity">
                                <img 
                                    src="/assets/sponsors/culturium.png" 
                                    alt="Culturium" 
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                            <div className="flex items-center justify-center h-20 brightness-0 invert  opacity-80 hover:opacity-100 transition-opacity">
                                <img 
                                    src="/assets/sponsors/tnkoffe.png" 
                                    alt="TNKoffe" 
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                            <div className="flex items-center justify-center h-9 brightness-0 invert  opacity-80 hover:opacity-100 transition-opacity">
                                <img 
                                    src="/assets/sponsors/yasmine.png" 
                                    alt="Yasmine" 
                                    className="h-full w-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gold mb-4">Navigation</h4>
                        <ul className="space-y-3">
                            <li><a href="#livre" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#livre'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">Le Livre</a></li>
                            <li><a href="#autrice" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#autrice'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">L'Auteure</a></li>
                            <li><a href="#groupes" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#groupes'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">Le Think Tank</a></li>
                            <li><a href="#podcast" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#podcast'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">Le Podcast</a></li>
                            <li><a href="#boite-idees" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#boite-idees'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">Vos Recommandations</a></li>
                            <li><a href="#newsletter" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#newsletter'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">La Newsletter</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); const el = document.querySelector('#contact'); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} className="text-white/90 hover:text-gold transition-colors cursor-pointer">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Legal */}
                    <div>
                        <h4 className="text-lg font-semibold text-gold mb-4">Contact</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-white/90 hover:text-gold transition-colors">Mentions légales</a></li>
                            <li><a href="#" className="text-white/90 hover:text-gold transition-colors">Politique de confidentialité</a></li>
                            <li><a href="#" className="text-white/90 hover:text-gold transition-colors">Conditions d'utilisation</a></li>
                            <li><a href="#" className="text-white/90 hover:text-gold transition-colors">Nous contacter</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
}


