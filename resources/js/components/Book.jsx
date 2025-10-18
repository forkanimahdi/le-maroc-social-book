import React, { useState } from 'react';
import Tabs from './ui/Tabs.jsx';
import QuoteModal from './ui/QuoteModal.jsx';

function sendExecutiveSummaryByEmail({ prenom, nom, email, pays }) {
    // Simulation d’envoi d’email (remplacez par votre intégration réelle)
    // eslint-disable-next-line no-console
    console.log('Simulation envoi Executive Summary à', { prenom, nom, email, pays });
    return new Promise((resolve) => setTimeout(resolve, 800));
}

export default function Book() {
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({ prenom: '', nom: '', email: '', pays: '' });
    const [sent, setSent] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        await sendExecutiveSummaryByEmail(state);
        setSent(true);
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center mb-20">
                    <div className="mb-6">
                        <span className="text-sm font-medium text-royal-red-soft tracking-wider uppercase">LE LIVRE</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-royal-red-soft mb-8">
                        Le Maroc Social 2030
                    </h2>
                    <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                        Ouvrage de réflexion stratégique et de mobilisation citoyenne qui propose une vision collective 
                        pour renforcer la cohésion, l'équité et la dignité au Maroc.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left: Tabs content */}
                    <div className="lg:col-span-2">
                        <Tabs
                            tabs={[
                                { label: 'Présentation', content: (
                                    <div className="bg-royal-red-soft p-8 rounded-lg border border-royal-red-soft">
                                        <h3 className="text-2xl font-semibold text-royal-red-soft mb-6">Vision éditoriale</h3>
                                        <p className="text-lg leading-relaxed text-zinc-700">
                                            Un éclairage éditorial sur les enjeux sociaux et les trajectoires d'impact,
                                            au croisement de l'analyse et de l'action citoyenne.
                                        </p>
                                    </div>
                                )},
                                { label: 'Extraits', content: (
                                    <div className="grid gap-6">
                                        <button className="bg-royal-red-soft p-8 text-left hover:bg-royal-red-soft/80 transition-all duration-300 rounded-lg border border-royal-red-soft" onClick={() => setOpen({ type: 'red' })}>
                                            <div className="text-royal-red-soft text-sm font-medium mb-3 uppercase tracking-wide">Citation</div>
                                            <blockquote className="text-lg italic text-zinc-700 leading-relaxed">
                                                « La justice sociale n'est pas un slogan : c'est un chantier quotidien où chaque citoyen compte. »
                                            </blockquote>
                                        </button>
                                        <button className="bg-royal-green-soft p-8 text-left hover:bg-royal-green-soft/80 transition-all duration-300 rounded-lg border border-royal-green-soft" onClick={() => setOpen({ type: 'green' })}>
                                            <div className="text-royal-green-soft text-sm font-medium mb-3 uppercase tracking-wide">Citation</div>
                                            <blockquote className="text-lg italic text-zinc-700 leading-relaxed">
                                                « Investir dans la jeunesse, c'est investir dans la prospérité commune. »
                                            </blockquote>
                                        </button>
                                    </div>
                                )},
                                { label: 'Messages clés', content: (
                                    <div className="bg-gold-soft p-8 rounded-lg border border-gold-soft">
                                        <h3 className="text-2xl font-semibold text-royal-red-soft mb-8">Piliers fondamentaux</h3>
                                        <ul className="space-y-6 text-zinc-700">
                                            <li className="flex items-start gap-4">
                                                <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-lg leading-relaxed">Justice sociale et dignité</span>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-lg leading-relaxed">Jeunesse, éducation et inclusion</span>
                                            </li>
                                            <li className="flex items-start gap-4">
                                                <div className="w-3 h-3 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-lg leading-relaxed">Économie solidaire et protection sociale</span>
                                            </li>
                                        </ul>
                                    </div>
                                )},
                            ]}
                        />
                    </div>

                    {/* Right: CTA section */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-gradient-to-br from-royal-red-soft to-gold-soft p-8 text-center rounded-lg border border-royal-red-soft">
                            <h3 className="text-2xl font-semibold text-royal-red-soft mb-4">Executive Summary</h3>
                            <p className="text-zinc-700 mb-8 leading-relaxed">
                                Recevez le résumé exécutif par e-mail pour découvrir les points clés du livre.
                            </p>
                            <button onClick={() => setOpen(true)} className="btn-primary bg-royal-red text-cream hover:opacity-95 w-full">
                                Télécharger le résumé
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote modal */}
            {open && typeof open === 'object' && (
                <QuoteModal open={true} onClose={() => setOpen(false)} variant={open.type === 'green' ? 'green' : 'red'} quote={open.type === 'green' ? "Investir dans la jeunesse, c’est investir dans la prospérité commune." : "La justice sociale n’est pas un slogan : c’est un chantier quotidien."} author="Oumaima Mhijir" />
            )}

            {/* Email modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-2xl card-surface p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-semibold text-royal-red">Executive Summary</h3>
                                <p className="text-zinc-600 mt-1">Recevez le résumé par e‑mail</p>
                            </div>
                            <button onClick={() => { setOpen(false); setSent(false); }} className="text-zinc-700 hover:opacity-80 text-2xl">✕</button>
                        </div>
                        {!sent ? (
                            <form onSubmit={onSubmit} className="grid gap-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-royal-red mb-2">Prénom</label>
                                        <input required value={state.prenom} onChange={(e) => setState({ ...state, prenom: e.target.value })} className="w-full input-soft" placeholder="Votre prénom" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-royal-red mb-2">Nom</label>
                                        <input required value={state.nom} onChange={(e) => setState({ ...state, nom: e.target.value })} className="w-full input-soft" placeholder="Votre nom" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-royal-red mb-2">E‑mail</label>
                                    <input required type="email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} className="w-full input-soft" placeholder="nom@exemple.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-royal-red mb-2">Pays</label>
                                    <input value={state.pays} onChange={(e) => setState({ ...state, pays: e.target.value })} className="w-full input-soft" placeholder="Maroc" />
                                </div>
                                <div className="flex items-center gap-4 pt-4">
                                    <button type="submit" className="btn-primary bg-royal-red text-cream hover:opacity-95 flex-1">Envoyer le résumé</button>
                                    <button type="button" onClick={() => { setOpen(false); setSent(false); }} className="btn-primary bg-cream text-royal-red hover:opacity-95">Annuler</button>
                                </div>
                            </form>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">✓</span>
                                </div>
                                <h4 className="text-xl font-semibold text-royal-red mb-2">Merci !</h4>
                                <p className="text-zinc-700">Le résumé vous a été envoyé par e‑mail (simulation).</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


