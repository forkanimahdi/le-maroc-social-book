import React, { useMemo, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function IdeasBox({ ideas = [] }) {
    const { data, setData, post, processing, reset } = useForm({
        full_name: '',
        role: '',
        text: '',
        agree: false,
    });

    const [submitted, setSubmitted] = useState(false);

    const approvedIdeas = useMemo(() => ideas.filter((i) => i.status === 'approved'), [ideas]);

    const submitIdea = (e) => {
        e.preventDefault();
        post('/api/ideas', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
                setTimeout(() => setSubmitted(false), 3000);
            }
        });
    };


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-royal-red-soft tracking-wider uppercase">BOÎTE À IDÉES</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-royal-red-soft mb-8">
                        Partagez Votre Vision
                    </h2>
                    <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                        Contribuez à la construction d'un Maroc plus solidaire en partageant vos idées et réflexions.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Submission Form */}
                    <div>
                        <div className="bg-gradient-to-br from-royal-red-soft to-white p-8 rounded-lg border border-royal-red-soft">
                            <h3 className="text-2xl font-semibold text-royal-red-soft mb-6">Proposer une idée</h3>
                            
                            <form onSubmit={submitIdea} className="space-y-6">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-royal-red-soft mb-3 uppercase tracking-wide">Nom complet</label>
                                        <input
                                            type="text"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            required
                                            className="w-full p-4 rounded-lg border border-royal-red-soft focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all duration-300"
                                            placeholder="Votre nom complet"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-royal-red-soft mb-3 uppercase tracking-wide">Rôle / Profession</label>
                                        <input
                                            type="text"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            required
                                            className="w-full p-4 rounded-lg border border-royal-red-soft focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all duration-300"
                                            placeholder="Ex. Entrepreneur, Étudiant, Chercheur..."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-royal-red-soft mb-3 uppercase tracking-wide">Votre idée</label>
                                        <textarea
                                            value={data.text}
                                            onChange={(e) => setData('text', e.target.value)}
                                            required
                                            rows={5}
                                            className="w-full p-4 rounded-lg border border-royal-red-soft focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all duration-300 resize-none"
                                            placeholder="Décrivez votre idée pour améliorer la société marocaine..."
                                        />
                                </div>

                                <label className="flex items-center gap-3 text-zinc-700 cursor-pointer group">
                                    <div className="relative">
                                        <input 
                                            type="checkbox" 
                                            checked={data.agree} 
                                            onChange={(e) => setData('agree', e.target.checked)} 
                                            required 
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                                            data.agree 
                                                ? 'bg-royal-red border-royal-red' 
                                                : 'border-royal-red/50 group-hover:border-royal-red'
                                        }`}>
                                            {data.agree && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-sm font-medium">J'accepte que mon idée soit publiée publiquement</span>
                                </label>

                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full py-3 px-6 rounded-lg font-semibold bg-royal-red text-white hover:bg-royal-red/90 transition-colors duration-300 disabled:opacity-50"
                                    >
                                        {processing ? 'Envoi en cours...' : 'Envoyer mon idée'}
                                    </button>

                                {submitted && (
                                    <div className="text-center p-4 bg-royal-red-soft rounded-lg border border-royal-red-soft">
                                        <div className="flex items-center justify-center gap-2 text-royal-red">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-semibold">Merci ! Votre idée est en cours de modération.</span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>

                    </div>

                    {/* Published Ideas Space */}
                    <div>
                        <div className="bg-gradient-to-br from-royal-red-soft to-white p-8 rounded-lg border border-royal-red-soft">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-2xl font-semibold text-royal-red-soft">Espace Public</h3>
                                <div className="flex items-center gap-2 text-sm text-royal-red">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-medium">{approvedIdeas.length} idée{approvedIdeas.length > 1 ? 's' : ''} publiée{approvedIdeas.length > 1 ? 's' : ''}</span>
                                </div>
                            </div>

                            {approvedIdeas.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-royal-red-soft rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-royal-red" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                        </svg>
                                    </div>
                                    <p className="text-zinc-600 mb-2">Aucune idée publiée pour le moment</p>
                                    <p className="text-sm text-zinc-500">Soyez le premier à partager votre vision !</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                    {approvedIdeas.map((idea, index) => (
                                        <div 
                                            key={idea.id} 
                                            className="p-6 bg-white rounded-lg border border-royal-red-soft hover:shadow-md transition-all duration-300"
                                        >
                                            <div className="space-y-3">
                                                {/* Name and Role - LinkedIn style */}
                                                <div>
                                                    <h4 className="text-lg font-semibold text-zinc-900 mb-1">{idea.full_name || 'Anonyme'}</h4>
                                                    <p className="text-sm text-zinc-600">{idea.role || 'Contributeur'}</p>
                                                </div>
                                                
                                                {/* Idea Content */}
                                                <div className="pt-3 border-t border-zinc-200">
                                                    <p className="text-zinc-800 leading-relaxed">{idea.text}</p>
                                                </div>
                                                
                                                {/* Date */}
                                                <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Publiée le {new Date(idea.created_at || idea.createdAt).toLocaleDateString('fr-FR')}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


