import React from 'react';

export default function Author() {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">L’Autrice</h2>
            <div className="mt-6 grid gap-10 md:grid-cols-2">
                <div className="prose max-w-none prose-zinc card-surface p-6">
                    <p>
                        Oumaima Mhijir est une autrice et chercheuse engagée pour la justice sociale, la
                        participation citoyenne et l’égalité des chances. Son travail relie analyse
                        stratégique, terrain et innovation sociale afin de proposer des cadres d’action
                        concrets au service de l’intérêt général.
                    </p>
                    <p>
                        À travers « Le Maroc Social 2030 », elle fédère des voix, des expériences et des
                        expertises, pour bâtir une ambition commune : un Maroc plus inclusif, plus
                        solidaire et tourné vers l’avenir.
                    </p>
                    <div className="mt-4 pl-4 border-l-2 border-zinc-300 italic text-zinc-700">
                        « La transformation sociale commence par l’écoute et se poursuit par l’action. »
                    </div>
                </div>
                <div>
                    {/* Galerie / médias à remplacer par vos assets finaux */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="aspect-[4/5] card-surface" />
                        <div className="aspect-[4/5] card-surface" />
                        <div className="aspect-[4/5] card-surface" />
                    </div>
                    <p className="mt-3 text-sm text-zinc-500">Galerie photos/vidéos — placeholders</p>
                </div>
            </div>
        </div>
    );
}


