import React, { useState, useEffect } from 'react';

export default function Author({ content = null }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Default content if none provided
    const defaultContent = {
        bio_title: "Biographie d'Oumaima Mhijir",
        bio_content: "Oumaima Mhijir est une figure emblématique de la transformation sociale au Maroc. Autrice, chercheuse et entrepreneure sociale, elle consacre sa carrière à la promotion de la justice sociale, de la participation citoyenne et de l'égalité des chances.\n\nSon approche unique combine analyse stratégique, recherche terrain et innovation sociale pour développer des cadres d'action concrets au service de l'intérêt général. À travers « Le Maroc Social 2030 », elle fédère des voix, des expériences et des expertises pour bâtir une ambition commune.\n\nChercheuse en politiques sociales et développement, fondatrice d'initiatives d'innovation sociale, mentor et formatrice en leadership citoyen, elle est également une conférencière reconnue sur la transformation sociale au Maroc et au-delà.",
        bio_quote: "La transformation sociale commence par l'écoute et se poursuit par l'action.",
        images: [
            { id: 1, title: "Conférence publique" },
            { id: 2, title: "Travail de recherche" },
            { id: 3, title: "Mentorat" },
            { id: 4, title: "Publications" },
            { id: 5, title: "Engagement social" },
            { id: 6, title: "Formation" }
        ],
        social_linkedin: '#',
        social_twitter: '#',
        social_instagram: '#'
    };
    
    const authorContent = content || defaultContent;
    // Normalize images to always be an array of objects
    let images = authorContent && authorContent.images !== undefined ? authorContent.images : defaultContent.images;
    if (typeof images === 'string') {
        try {
            images = JSON.parse(images);
        } catch {
            images = [];
        }
    }
    if (!Array.isArray(images)) {
        images = [];
    }
    // Ensure each image has id, title and a usable src
    images = images.map((img, idx) => ({
        id: img.id ?? idx + 1,
        title: img.title ?? `Image ${idx + 1}`,
        src: img.src ?? img.url ?? '/assets/hero.jpg',
    }));

    useEffect(() => {
        if (!images.length) return;
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
                        <span className="text-sm font-medium text-gold tracking-wider uppercase">L'AUTEURE</span>
                    </div>
                    <h2 className="text-5xl sm:text-7xl font-bold tracking-tight text-gold mb-8">
                        Oumaima Mhijir
                    </h2>
                    <p className="text-xl leading-relaxed text-white max-w-4xl mx-auto">
                        Auteure, experte en entrepreneuriat social international, maman, étudiante en psychologie et en innovation sociale.
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
                                        {authorContent.bio_content.split('\n\n')[0]}
                                    </p>
                              
                                    <div className="pt-6">
                                        <blockquote className="text-xl italic text-gold border-l-4 border-gold pl-6">
                                            "{authorContent.bio_quote}"
                                        </blockquote>
                                    </div>
                                </div>

                            {/* Portfolio Button */}
                            <div className="mt-8 pt-8 border-t border-gold/30">
                                <a 
                                    href="/assets/portfolio.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
                                    style={{ backgroundColor: 'var(--gold)', color: 'black' }}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Check my portfolio
                                </a>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-8 border-t border-gold/30">
                                <h4 className="text-xl font-semibold text-gold mb-6">Suivez son actualité</h4>
                                <div className="grid grid-cols-5  gap-5">
                                    <a 
                                        href={authorContent.social_linkedin || 'https://linkedin.com'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center  rounded-xl hover:scale-105 transition-all duration-300  hover:shadow-lg"
                                        
                                    >
                                        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(27, 78, 11, 0.2)' }}>
                                            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </div>
                                        
                                    </a>
                                    <a 
                                        href={authorContent.social_instagram || 'https://instagram.com'} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center  rounded-xl hover:scale-105 transition-all duration-300  hover:shadow-lg"
                                        
                                    >
                                        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(27, 78, 11, 0.2)' }}>
                                            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                            </svg>
                                        </div>
                                        
                                    </a>
                                    <a 
                                        href="https://facebook.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center  rounded-xl hover:scale-105 transition-all duration-300  hover:shadow-lg"
                                        
                                    >
                                        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(27, 78, 11, 0.2)' }}>
                                            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                            </svg>
                                        </div>
                                        
                                    </a>
                                    <a 
                                        href="https://spotify.com" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center justify-center  rounded-xl hover:scale-105 transition-all duration-300  hover:shadow-lg"
                                        
                                    >
                                        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(27, 78, 11, 0.2)' }}>
                                            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.362.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                                            </svg>
                                        </div>
                                        
                                    </a>
                                    <a 
                                        href="mailto:contact@maroc-social-2030.ma" 
                                        className="flex flex-col items-center justify-center  rounded-xl hover:scale-105 transition-all duration-300  hover:shadow-lg"
                                        
                                    >
                                        <div className="p-2 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(27, 78, 11, 0.2)' }}>
                                            <svg className="w-6 h-6" style={{ color: 'var(--gold)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Auto-sliding Carousel */}
                    <div className="lg:sticky lg:top-24">
                        {/* <h3 className="text-3xl font-bold text-gold mb-10 text-center">Galerie</h3> */}
                        
                        <div className="relative overflow-hidden rounded-lg">
                            <div 
                                className="flex transition-transform duration-700 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div key={image.id} className="w-full flex-shrink-0">
                                        <div className="aspect-[4/5] bg-white/10 backdrop-blur-sm rounded-lg border border-gold/30 flex items-center justify-center relative overflow-hidden">
                                               <img 
                                                   src={image.src.includes("/storage/storage/") ? image.src.slice(8) : image.src} 
                                                   alt={image.title} 
                                                   className="w-full h-full object-cover" 
                                                   loading="lazy"
                                                   decoding="async"
                                               />
                                        
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

                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


