import React from 'react';

const EPISODES = [
    { id: 1, titre: 'Épisode 1 — Jeunesse et avenir', intervenants: 'Invitée A', theme: 'Éducation' },
    { id: 2, titre: 'Épisode 2 — Santé pour tous', intervenants: 'Invité B', theme: 'Santé' },
];

export default function Podcast() {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">Podcast</h2>
            <div className="mt-6 grid md:grid-cols-2 gap-8 items-start">
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-white/80">
                    {/* Remplacez par votre lecteur (Spotify/YouTube/SoundCloud) */}
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Podcast"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                <div>
                    <ul className="grid gap-3">
                        {EPISODES.map((e) => (
                            <li key={e.id} className="p-4 rounded-lg bg-white/80">
                                <p className="font-medium">{e.titre}</p>
                                <p className="text-sm text-zinc-600">{e.intervenants} — {e.theme}</p>
                            </li>
                        ))}
                    </ul>
                     <a href="#" className="inline-block mt-4 btn-primary">S’abonner</a>
                </div>
            </div>
        </div>
    );
}


