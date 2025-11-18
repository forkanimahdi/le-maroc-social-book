import React, { useState, useRef, useEffect } from 'react';

export default function Podcast({ episodes = [] }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    // YouTube channel URL and video ID (preview)
    const youtubeChannelUrl = 'https://www.youtube.com/@maroc-social-2030';
    const youtubeVideoId = 'dQw4w9WgXcQ'; // Replace with actual preview video ID

    // Spotify podcast URL
    const spotifyPodcastUrl = 'https://open.spotify.com/show/maroc-social-2030'; // Replace with actual Spotify URL
    const audioUrl = '/assets/test.ogg';

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            const updateTime = () => setCurrentTime(audio.currentTime);
            const updateDuration = () => setDuration(audio.duration);
            
            audio.addEventListener('timeupdate', updateTime);
            audio.addEventListener('loadedmetadata', updateDuration);
            
            return () => {
                audio.removeEventListener('timeupdate', updateTime);
                audio.removeEventListener('loadedmetadata', updateDuration);
            };
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleProgressChange = (e) => {
        const audio = audioRef.current;
        if (audio) {
            const newTime = (e.target.value / 100) * duration;
            audio.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="bg-royal-green">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-gold tracking-wider uppercase">PODCAST</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-gold mb-8">
                        Conversations Sociales
                    </h2>
                    <p className="text-xl leading-relaxed text-white max-w-4xl mx-auto">
                        Découvrez les discussions approfondies avec des experts et acteurs du changement social au Maroc.
                    </p>
                </div>

                {/* Split Layout: YouTube and Spotify */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* YouTube Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-gold/30 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-8 h-8" style={{ color: 'var(--royal-red)' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <h3 className="text-2xl font-bold text-gold">YouTube</h3>
                            </div>
                            
                            {/* YouTube Video Preview */}
                            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden mb-4">
                                <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${youtubeVideoId}?controls=1&modestbranding=1&rel=0`}
                                    title="YouTube video preview"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Subscribe Invitation */}
                            <div className="bg-white/10 rounded-lg p-6 border border-gold/30">
                                <h4 className="text-lg font-semibold text-gold mb-2">Abonnez-vous à notre chaîne</h4>
                                <p className="text-white/90 text-sm mb-4">
                                    Rejoignez notre communauté YouTube pour accéder à tous les épisodes complets et ne manquer aucune discussion.
                                </p>
                                <a
                                    href={youtubeChannelUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                                    style={{ backgroundColor: 'var(--royal-red)', color: 'white' }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    S'abonner à la chaîne
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Spotify Section */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-gold/30 overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <svg className="w-8 h-8" style={{ color: 'var(--gold)' }} fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.362.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                                </svg>
                                <h3 className="text-2xl font-bold text-gold">Spotify</h3>
                            </div>

                            {/* Spotify-style Audio Player - Fancy Design */}
                            <div className="relative overflow-hidden rounded-2xl p-8 mb-4 shadow-2xl" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)' }}>
                                {/* Decorative Background Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: 'var(--gold)', transform: 'translate(30%, -30%)' }}></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-15" style={{ backgroundColor: 'var(--gold)', transform: 'translate(-30%, 30%)' }}></div>
                                
                                {/* Album/Book Cover */}
                                <div className="relative flex items-center gap-6 mb-8">
                                    <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }}>
                                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
                                        <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0 relative z-10">
                                        <h4 className="text-white font-bold text-xl mb-2 truncate drop-shadow-lg">Le Maroc Social 2030</h4>
                                        <p className="text-white/80 text-sm truncate">Audiobook Preview</p>
                                    </div>
                                </div>

                                {/* Audio Controls */}
                                <div className="relative z-10 space-y-6">
                                    {/* Progress Bar */}
                                    <div>
                                        <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                                            <div 
                                                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                                                style={{ 
                                                    width: `${progress}%`,
                                                    backgroundColor: 'var(--gold)',
                                                    boxShadow: '0 0 10px rgba(204, 185, 116, 0.5)'
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs mt-2" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                            <span className="font-medium">{formatTime(currentTime)}</span>
                                            <span className="font-medium">{formatTime(duration)}</span>
                                        </div>
                                    </div>

                                    {/* Play/Pause Controls */}
                                    <div className="flex items-center justify-center gap-6">
                                        <button 
                                            className="p-2 rounded-full transition-all hover:scale-110"
                                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.9)' }}
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={togglePlay}
                                            className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-2xl relative overflow-hidden"
                                            style={{ backgroundColor: 'var(--gold)' }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                                            {isPlaying ? (
                                                <svg className="w-6 h-6 relative z-10" style={{ color: 'var(--royal-green)' }} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 relative z-10 " style={{ color: 'var(--royal-green)' }} fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z"/>
                                                </svg>
                                            )}
                                        </button>
                                        <button 
                                            className="p-2 rounded-full transition-all hover:scale-110"
                                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'rgba(255, 255, 255, 0.9)' }}
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M16 6h2v12h-2zm-3.5 6l-8.5 6V6z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                {/* Hidden Audio Element */}
                                <audio
                                    ref={audioRef}
                                    src={audioUrl}
                                    onEnded={() => setIsPlaying(false)}
                                />
                            </div>

                            {/* Spotify Join Invitation */}
                            <div className="bg-white/10 rounded-lg p-6 border border-gold/30">
                                <h4 className="text-lg font-semibold text-gold mb-2">Écoutez le livre complet sur Spotify</h4>
                                <p className="text-white/90 text-sm mb-4">
                                    Rejoignez Spotify pour écouter l'intégralité de l'audiobook et accéder à tous les épisodes.
                                </p>
                                <a
                                    href={spotifyPodcastUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors"
                                    style={{ backgroundColor: 'var(--gold)', color: 'var(--royal-green)' }}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.84-.66 0-.362.24-.66.54-.779 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                                    </svg>
                                    Écouter sur Spotify
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
