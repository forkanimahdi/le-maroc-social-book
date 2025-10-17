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
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
            <h2 className="text-3xl font-semibold tracking-tight">Le Livre</h2>
            <p className="mt-4 max-w-3xl text-zinc-700 leading-7">
                Ouvrage de réflexion stratégique et de mobilisation citoyenne, « Le Maroc Social 2030 »
                propose une vision collective pour renforcer la cohésion, l’équité et la dignité au Maroc.
                À travers des analyses, des témoignages et des propositions concrètes, le livre met en
                lumière des trajectoires d’impact et des pistes de transformation sociale.
            </p>

            <div className="mt-8">
                <Tabs
                    tabs={[
                        { label: 'Présentation', content: (
                            <div className="card-surface p-6 text-zinc-700">
                                <p>
                                    Un éclairage éditorial sur les enjeux sociaux et les trajectoires d’impact,
                                    au croisement de l’analyse et de l’action citoyenne.
                                </p>
                            </div>
                        )},
                        { label: 'Extraits', content: (
                            <div className="grid gap-4 sm:grid-cols-2">
                                <button className="card-surface p-6 text-left" onClick={() => setOpen({ type: 'red' })}>
                                    « La justice sociale n’est pas un slogan : c’est un chantier quotidien… »
                                </button>
                                <button className="card-surface p-6 text-left" onClick={() => setOpen({ type: 'green' })}>
                                    « Investir dans la jeunesse, c’est investir dans la prospérité commune. »
                                </button>
                            </div>
                        )},
                        { label: 'Messages clés', content: (
                            <ul className="card-surface p-6 list-disc pl-5 text-zinc-700">
                                <li>Justice sociale et dignité.</li>
                                <li>Jeunesse, éducation et inclusion.</li>
                                <li>Économie solidaire et protection sociale.</li>
                            </ul>
                        )},
                    ]}
                />
            </div>

            <div className="mt-10">
                <button onClick={() => setOpen(true)} className="btn-primary">
                    Télécharger l’Executive Summary
                </button>
            </div>

            {/* Quote modal */}
            {open && typeof open === 'object' && (
                <QuoteModal open={true} onClose={() => setOpen(false)} variant={open.type === 'green' ? 'green' : 'red'} quote={open.type === 'green' ? "Investir dans la jeunesse, c’est investir dans la prospérité commune." : "La justice sociale n’est pas un slogan : c’est un chantier quotidien."} author="Oumaima Mhijir" />
            )}

            {/* Email modal */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
                    <div className="w-full max-w-lg card-surface p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-medium">Recevoir le résumé par e‑mail</h3>
                            <button onClick={() => { setOpen(false); setSent(false); }} className="text-zinc-700 hover:opacity-80">✕</button>
                        </div>
                        {!sent ? (
                            <form onSubmit={onSubmit} className="mt-6 grid gap-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm">Prénom</label>
                                        <input required value={state.prenom} onChange={(e) => setState({ ...state, prenom: e.target.value })} className="mt-1 w-full input-soft" placeholder="Votre prénom" />
                                    </div>
                                    <div>
                                        <label className="block text-sm">Nom</label>
                                        <input required value={state.nom} onChange={(e) => setState({ ...state, nom: e.target.value })} className="mt-1 w-full input-soft" placeholder="Votre nom" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm">E‑mail</label>
                                    <input required type="email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} className="mt-1 w-full input-soft" placeholder="nom@exemple.com" />
                                </div>
                                <div>
                                    <label className="block text-sm">Pays</label>
                                    <input value={state.pays} onChange={(e) => setState({ ...state, pays: e.target.value })} className="mt-1 w-full input-soft" placeholder="Maroc" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <button type="submit" className="btn-primary">Envoyer</button>
                                    <button type="button" onClick={() => { setOpen(false); setSent(false); }} className="px-4 py-2 rounded-lg bg-white/70">Annuler</button>
                                </div>
                            </form>
                        ) : (
                            <div className="mt-6">
                                <p className="text-green-700">Merci ! Le résumé vous a été envoyé par e‑mail (simulation).</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}


