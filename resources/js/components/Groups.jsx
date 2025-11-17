import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

// Configuration des groupes de travail
const GROUPS_CONFIG = {
    education: {
        title: 'Éducation et Jeunesse',
        description: 'Promouvoir l\'accès équitable à l\'éducation et développer les compétences des jeunes pour un Maroc prospère.',
        objectives: ['Éducation inclusive', 'Formation professionnelle', 'Innovation pédagogique', 'Insertion des jeunes']
    },
    sante: {
        title: 'Santé et Protection sociale',
        description: 'Renforcer les systèmes de santé et de protection sociale pour garantir le bien-être de tous les citoyens.',
        objectives: ['Couverture santé universelle', 'Prévention et sensibilisation', 'Protection sociale', 'Santé mentale']
    },
    economie: {
        title: 'Économie solidaire et Emploi',
        description: 'Développer une économie inclusive et créatrice d\'emplois décents pour tous les Marocains.',
        objectives: ['Entrepreneuriat social', 'Emploi des jeunes', 'Économie circulaire', 'Inclusion financière']
    },
    genre: {
        title: 'Genre, Inclusion et Citoyenneté',
        description: 'Promouvoir l\'égalité des genres et l\'inclusion sociale pour une société plus juste et équitable.',
        objectives: ['Égalité des genres', 'Inclusion sociale', 'Participation citoyenne', 'Droits humains']
    }
};

// Liens WhatsApp simulés
const GROUP_LINKS = {
    education: 'https://wa.me/1234567890',
    sante: 'https://wa.me/1234567891',
    economie: 'https://wa.me/1234567892',
    genre: 'https://wa.me/1234567893'
};

export default function Groups() {
    const { data, setData, post, processing, reset } = useForm({
        group: 'education',
        nom: '',
        email: '',
        domaine: '',
        motivation: '',
    });

    const [done, setDone] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post('/api/groups', {
            onSuccess: () => {
                setDone(true);
                reset();
                setTimeout(() => setDone(false), 5000);
            }
        });
    };

    const link = GROUP_LINKS[data.group];
    const selectedGroup = GROUPS_CONFIG[data.group];

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-royal-green-soft tracking-wider uppercase">GROUPES DE TRAVAIL</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-royal-green-soft mb-8">
                        Le Cœur Participatif
                    </h2>
                    <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                        Quatre groupes réunissent citoyens et experts pour concevoir des actions concrètes 
                        et transformer le Maroc social de demain.
                    </p>
                </div>

                {/* Groups Overview */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {Object.entries(GROUPS_CONFIG).map(([key, group]) => (
                        <div key={key} className="bg-royal-green-soft p-6 rounded-lg border border-royal-green-soft hover:bg-royal-green-soft/80 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-royal-green-soft mb-3">{group.title}</h3>
                            <p className="text-zinc-700 text-sm leading-relaxed mb-4">{group.description}</p>
                            <div className="space-y-2">
                                {group.objectives.map((objective, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-royal-green rounded-full flex-shrink-0"></div>
                                        <span className="text-zinc-600 text-xs">{objective}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Registration Form */}
                    <div>
                        <div className="bg-royal-green-soft p-8 rounded-lg border border-royal-green-soft">
                            <h3 className="text-2xl font-semibold text-royal-green-soft mb-6">Rejoindre un Groupe</h3>
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Choix du groupe</label>
                                        <select 
                                            value={data.group} 
                                            onChange={(e) => setData('group', e.target.value)} 
                                            className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300"
                                        >
                                        <option value="education">Éducation et Jeunesse</option>
                                        <option value="sante">Santé et Protection sociale</option>
                                        <option value="economie">Économie solidaire et Emploi</option>
                                        <option value="genre">Genre, Inclusion et Citoyenneté</option>
                                    </select>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Nom complet</label>
                                            <input 
                                                required 
                                                value={data.nom} 
                                                onChange={(e) => setData('nom', e.target.value)} 
                                                className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300" 
                                                placeholder="Votre nom complet" 
                                            />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">E-mail</label>
                                        <input 
                                            required 
                                            type="email" 
                                            value={data.email} 
                                            onChange={(e) => setData('email', e.target.value)} 
                                            className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300" 
                                            placeholder="nom@exemple.com" 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Domaine d'intérêt</label>
                                    <input 
                                        value={data.domaine} 
                                        onChange={(e) => setData('domaine', e.target.value)} 
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300" 
                                        placeholder="Ex. inclusion numérique, formation professionnelle..." 
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Motivation</label>
                                    <textarea 
                                        rows={4} 
                                        value={data.motivation} 
                                        onChange={(e) => setData('motivation', e.target.value)} 
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300 resize-none" 
                                        placeholder="Pourquoi souhaitez-vous rejoindre ce groupe ? Quelles sont vos attentes ?" 
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full py-4 px-8 rounded-lg font-semibold text-lg bg-royal-green text-white hover:bg-royal-green/90 transition-colors duration-300 disabled:opacity-50"
                                >
                                    {processing ? 'Inscription en cours...' : 'S\'inscrire au groupe'}
                                </button>

                                {done && (
                                    <div className="text-center p-4 bg-royal-green-soft rounded-lg border border-royal-green-soft">
                                        <div className="flex items-center justify-center gap-2 text-royal-green">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="font-semibold">Merci pour votre inscription !</span>
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Selected Group Details */}
                    <div>
                        <div className="bg-royal-green-soft p-8 rounded-lg border border-royal-green-soft">
                            <h3 className="text-2xl font-semibold text-royal-green-soft mb-6">Groupe Sélectionné</h3>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-semibold text-royal-green-soft mb-3">{selectedGroup.title}</h4>
                                    <p className="text-zinc-700 leading-relaxed">{selectedGroup.description}</p>
                                </div>

                                <div>
                                    <h5 className="text-lg font-semibold text-royal-green-soft mb-4">Objectifs du groupe</h5>
                                    <div className="space-y-3">
                                        {selectedGroup.objectives.map((objective, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <div className="w-6 h-6 bg-royal-green rounded-full flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-zinc-700">{objective}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {done && (
                                    <div className="pt-6 border-t border-royal-green-soft">
                                        <div className="text-center">
                                            <h5 className="text-lg font-semibold text-royal-green-soft mb-4">Rejoindre la communauté</h5>
                                            <a 
                                                href={link} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-3 bg-royal-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-royal-green/90 transition-colors duration-300"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                                                </svg>
                                                Rejoindre WhatsApp
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


