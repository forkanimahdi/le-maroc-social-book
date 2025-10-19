import React, { useState, useEffect } from 'react';

export default function Author() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const images = [
        { id: 1, title: "Conférence publique" },
        { id: 2, title: "Travail de recherche" },
        { id: 3, title: "Mentorat" },
        { id: 4, title: "Publications" },
        { id: 5, title: "Engagement social" },
        { id: 6, title: "Formation" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 4000); // Auto-slide every 4 seconds

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="bg-royal-red">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                {/* Hero Header */}
                <div className="text-center mb-20">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-gold tracking-wider uppercase">L'AUTRICE</span>
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-gold mb-8">
                        Oumaima Mhijir
                    </h2>
                    <p className="text-xl leading-relaxed text-white max-w-4xl mx-auto">
                        Autrice, chercheuse et entrepreneure sociale engagée pour la justice et l'égalité des chances au Maroc.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 items-start">
                    {/* Left: Biography */}
                    <div className="space-y-8">
                        {/* Single Biography Section */}
                        <div className="bg-white/10 backdrop-blur-sm p-10 rounded-lg border border-gold/30">
                            <h3 className="text-3xl font-bold text-gold mb-8">Biographie</h3>
                            <div className="space-y-6 text-white leading-relaxed text-lg">
                                <p>
                                    Oumaima Mhijir est une figure emblématique de la transformation sociale au Maroc. 
                                    Autrice, chercheuse et entrepreneure sociale, elle consacre sa carrière à la promotion 
                                    de la justice sociale, de la participation citoyenne et de l'égalité des chances.
                                </p>
                                <p>
                                    Son approche unique combine analyse stratégique, recherche terrain et innovation sociale 
                                    pour développer des cadres d'action concrets au service de l'intérêt général. 
                                    À travers « Le Maroc Social 2030 », elle fédère des voix, des expériences et des 
                                    expertises pour bâtir une ambition commune.
                                </p>
                                <p>
                                    Chercheuse en politiques sociales et développement, fondatrice d'initiatives 
                                    d'innovation sociale, mentor et formatrice en leadership citoyen, elle est également 
                                    une conférencière reconnue sur la transformation sociale au Maroc et au-delà.
                                </p>
                                <div className="pt-6">
                                    <blockquote className="text-xl italic text-gold border-l-4 border-gold pl-6">
                                        "La transformation sociale commence par l'écoute et se poursuit par l'action."
                                    </blockquote>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-8 border-t border-gold/30">
                                <h4 className="text-xl font-semibold text-gold mb-6">Suivez son actualité</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="bg-gold text-royal-red p-4 rounded-lg hover:opacity-90 transition-opacity">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="bg-gold text-royal-red p-4 rounded-lg hover:opacity-90 transition-opacity">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a href="#" className="bg-gold text-royal-red p-4 rounded-lg hover:opacity-90 transition-opacity">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Auto-sliding Carousel */}
                    <div className="lg:sticky lg:top-24">
                        <h3 className="text-3xl font-bold text-gold mb-10 text-center">Galerie</h3>
                        
                        <div className="relative overflow-hidden rounded-lg">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div key={image.id} className="w-full flex-shrink-0">
                                        <div className="aspect-[4/5] bg-white/10 backdrop-blur-sm rounded-lg border border-gold/30 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent"></div>
                                            <div className="text-center z-10">
                                                <div className="text-gold text-sm font-medium mb-2">
                                                    {image.title}
                                                </div>
                                                <div className="text-white/60 text-xs">
                                                    Image {image.id}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Dots */}
                            <div className="flex justify-center mt-6 space-x-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentSlide 
                                                ? 'bg-gold scale-125' 
                                                : 'bg-gold/30 hover:bg-gold/60'
                                        }`}
                                    />
                                ))}
                            </div>

                            {/* Image Counter */}
                            <div className="text-center mt-4">
                                <span className="text-gold/70 text-sm">
                                    {currentSlide + 1} / {images.length}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


