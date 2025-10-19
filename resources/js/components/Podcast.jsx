import React, { useState } from 'react';

const EPISODES = [
    { 
        id: 1, 
        titre: 'Épisode 1 — Jeunesse et avenir', 
        intervenants: 'Oumaima Mhijir, Dr. Ahmed Benali', 
        theme: 'Éducation et Jeunesse',
        description: 'Exploration des défis et opportunités pour la jeunesse marocaine dans un monde en transformation.',
        duration: '45 min',
        date: '15 Janvier 2024',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts']
    },
    { 
        id: 2, 
        titre: 'Épisode 2 — Santé pour tous', 
        intervenants: 'Dr. Fatima Zahra, Pr. Mohamed Alami', 
        theme: 'Santé et Protection sociale',
        description: 'Discussion sur les enjeux de santé publique et les solutions pour une couverture universelle.',
        duration: '52 min',
        date: '22 Janvier 2024',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts']
    },
    { 
        id: 3, 
        titre: 'Épisode 3 — Économie solidaire', 
        intervenants: 'Oumaima Mhijir, Hassan El Mansouri', 
        theme: 'Économie solidaire et Emploi',
        description: 'Les nouvelles formes d\'économie collaborative et leur impact sur l\'emploi au Maroc.',
        duration: '38 min',
        date: '29 Janvier 2024',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts']
    },
    { 
        id: 4, 
        titre: 'Épisode 4 — Genre et inclusion', 
        intervenants: 'Aicha El Alaoui, Dr. Youssef Tazi', 
        theme: 'Genre, Inclusion et Citoyenneté',
        description: 'Promouvoir l\'égalité des genres et l\'inclusion sociale dans la société marocaine.',
        duration: '41 min',
        date: '5 Février 2024',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts']
    }
];

export default function Podcast() {
    const [selectedEpisode, setSelectedEpisode] = useState(EPISODES[0]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-royal-red-soft tracking-wider uppercase">PODCAST</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-royal-red-soft mb-8">
                        Conversations Sociales
                    </h2>
                    <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                        Découvrez les discussions approfondies avec des experts et acteurs du changement social au Maroc.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Player Section */}
                    <div>
                        <div className="bg-gradient-to-br from-royal-red-soft to-white p-8 rounded-lg border border-royal-red-soft">
                            <h3 className="text-2xl font-semibold text-royal-red-soft mb-6">Lecteur Audio</h3>
                            
                            {/* Audio Player */}
                            <div className="bg-white rounded-lg p-6 shadow-lg border border-royal-red-soft mb-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-royal-red-soft rounded-lg flex items-center justify-center">
                                        <svg className="w-8 h-8 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-zinc-800">{selectedEpisode.titre}</h4>
                                        <p className="text-sm text-zinc-600">{selectedEpisode.intervenants}</p>
                                    </div>
                                </div>
                                
                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="w-full bg-zinc-200 rounded-full h-2">
                                        <div className="bg-royal-red h-2 rounded-full" style={{width: '35%'}}></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-zinc-500 mt-1">
                                        <span>12:30</span>
                                        <span>{selectedEpisode.duration}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-center gap-4">
                                    <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                        <svg className="w-6 h-6 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                                        </svg>
                                    </button>
                                    <button className="p-3 bg-royal-red text-white rounded-full hover:bg-royal-red/90 transition-colors">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </button>
                                    <button className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                                        <svg className="w-6 h-6 text-zinc-600" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M16 6h2v12h-2zm-3.5 6l-8.5 6V6z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Episode Description */}
                            <div className="bg-white/50 rounded-lg p-4 border border-royal-red-soft">
                                <h5 className="font-semibold text-royal-red-soft mb-2">À propos de cet épisode</h5>
                                <p className="text-zinc-700 text-sm leading-relaxed">{selectedEpisode.description}</p>
                            </div>
                        </div>

                        {/* Subscription */}
                        <div className="mt-6 text-center">
                            <div className="bg-gradient-to-r from-royal-red-soft to-gold-soft p-6 rounded-lg border border-royal-red-soft">
                                <h4 className="text-lg font-semibold text-royal-red-soft mb-3">Restez informé</h4>
                                <p className="text-zinc-700 mb-4">Recevez une notification à chaque nouvel épisode</p>
                                <button className="bg-royal-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-royal-red/90 transition-colors">
                                    S'abonner au podcast
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Episodes List */}
                    <div>
                        <div className="bg-gradient-to-br from-royal-red-soft to-white p-8 rounded-lg border border-royal-red-soft">
                            <h3 className="text-2xl font-semibold text-royal-red-soft mb-6">Tous les épisodes</h3>
                            
                            <div className="space-y-4">
                                {EPISODES.map((episode) => (
                                    <div 
                                        key={episode.id} 
                                        className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                                            selectedEpisode.id === episode.id 
                                                ? 'bg-royal-red-soft border-royal-red shadow-md' 
                                                : 'bg-white border-royal-red-soft hover:bg-royal-red-soft/50'
                                        }`}
                                        onClick={() => setSelectedEpisode(episode)}
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                                selectedEpisode.id === episode.id 
                                                    ? 'bg-royal-red text-white' 
                                                    : 'bg-royal-red-soft text-royal-red'
                                            }`}>
                                                <span className="text-sm font-bold">{episode.id}</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-semibold mb-2 ${
                                                    selectedEpisode.id === episode.id ? 'text-royal-red' : 'text-zinc-800'
                                                }`}>
                                                    {episode.titre}
                                                </h4>
                                                <p className={`text-sm mb-2 ${
                                                    selectedEpisode.id === episode.id ? 'text-zinc-700' : 'text-zinc-600'
                                                }`}>
                                                    {episode.intervenants}
                                                </p>
                                                <div className="flex items-center gap-4 text-xs">
                                                    <span className={`px-2 py-1 rounded ${
                                                        selectedEpisode.id === episode.id 
                                                            ? 'bg-royal-red text-white' 
                                                            : 'bg-royal-red-soft text-royal-red'
                                                    }`}>
                                                        {episode.theme}
                                                    </span>
                                                    <span className={selectedEpisode.id === episode.id ? 'text-zinc-600' : 'text-zinc-500'}>
                                                        {episode.duration}
                                                    </span>
                                                    <span className={selectedEpisode.id === episode.id ? 'text-zinc-600' : 'text-zinc-500'}>
                                                        {episode.date}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Platforms */}
                            <div className="mt-8 pt-6 border-t border-royal-red-soft">
                                <h5 className="text-lg font-semibold text-royal-red-soft mb-4">Disponible sur</h5>
                                <div className="flex gap-4">
                                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                                        </svg>
                                        <span className="text-sm font-medium">Spotify</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                        </svg>
                                        <span className="text-sm font-medium">YouTube</span>
                                    </a>
                                    <a href="#" className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                        </svg>
                                        <span className="text-sm font-medium">Apple</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


