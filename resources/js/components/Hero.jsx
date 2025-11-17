import React from 'react';

export default function Hero() {
    return (
        <header id="accueil" className="relative isolate overflow-hidden">
            <div
                className="relative min-h-screen"
                style={{
                    backgroundImage: `linear-gradient(90deg, color-mix(in oklab, var(--royal-red) 65%, transparent), color-mix(in oklab, var(--gold) 25%, transparent)), url(/assets/hero.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-36 pb-28 h-screen flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                        {/* Left content */}
                        <div className="text-white">
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gold tracking-wider uppercase">BOOK GUIDELINE</span>
                            </div>
                            <h1 className="text-5xl minion-bold sm:text-7xl font-bold tracking-tight leading-tight mb-6">
                                LE MAROC<br />
                                <span className="text-gold">SOCIAL 2030</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-white/90 mb-8 max-w-lg">
                                « Un futur commun pour le Maroc se construit avec engagement, justice sociale et esprit d'ouverture. »
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a href="#livre" className="btn-primary bg-cream text-royal-red hover:opacity-95 text-center">Découvrir le livre</a>
                                <a href="#livre" className="btn-primary bg-gold text-royal-red hover:opacity-95 text-center">Télécharger le résumé</a>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <a href="#groupes" className="btn-primary bg-peach text-royal-red hover:opacity-95 text-center">Groupes de travail</a>
                                <a href="#podcast" className="btn-primary bg-olive text-cream hover:opacity-95 text-center">Podcast</a>
                            </div>
                        </div>
                        
                        {/* Right content - Author info */}
                        <div className="text-right text-white">
                            <div className="inline-block">
                                <div className="text-sm font-medium text-gold tracking-wider uppercase mb-2">AUTHOR</div>
                                <div className="text-2xl font-semibold text-cream">OUMAIMA MHIJIR</div>
                                <div className="mt-4 text-white/80 text-sm max-w-xs ml-auto">
                                    Autrice, chercheuse et entrepreneure sociale engagée pour la justice et l'égalité des chances au Maroc.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

