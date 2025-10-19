import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-royal-red via-royal-red/95 to-royal-red/90">
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
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors">
                                <svg className="w-5 h-5 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors">
                                <svg className="w-5 h-5 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors">
                                <svg className="w-5 h-5 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gold mb-4">Navigation</h4>
                        <ul className="space-y-3">
                            <li><a href="#livre" className="text-white/90 hover:text-gold transition-colors">Le Livre</a></li>
                            <li><a href="#autrice" className="text-white/90 hover:text-gold transition-colors">L'Autrice</a></li>
                            <li><a href="#boite-idees" className="text-white/90 hover:text-gold transition-colors">Boîte à Idées</a></li>
                            <li><a href="#groupes" className="text-white/90 hover:text-gold transition-colors">Groupes de Travail</a></li>
                            <li><a href="#podcast" className="text-white/90 hover:text-gold transition-colors">Podcast</a></li>
                            <li><a href="#newsletter" className="text-white/90 hover:text-gold transition-colors">Newsletter</a></li>
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

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gold/30">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-white/80 text-sm">
                            © {new Date().getFullYear()} Le Maroc Social 2030 — Tous droits réservés.
                        </p>
                        <p className="text-white/80 text-sm">
                            Fait avec ❤️ pour le Maroc
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}


