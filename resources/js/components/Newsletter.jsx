import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';

const STORAGE_KEY = 'ms2030_newsletter';

function saveSubscriber(item) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    list.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function simulateExternalSend(item) {
    // Simulation d'un envoi via Mailchimp/Brevo
    // eslint-disable-next-line no-console
    console.log('Simulation API newsletter', item);
    return new Promise((r) => setTimeout(r, 600));
}

function exportCsv() {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const header = ['nom', 'email'];
    const rows = list.map((s) => [s.nom, s.email]);
    const csv = [header, ...rows].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter.csv';
    a.click();
    URL.revokeObjectURL(url);
}

export default function Newsletter() {
    const { data, setData, post, processing, reset } = useForm({
        nom: '',
        email: '',
    });

    const [ok, setOk] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        post('/api/subscribers', {
            onSuccess: () => {
                setOk(true);
                reset();
                setTimeout(() => setOk(false), 5000);
            }
        });
    };

    return (
        <React.Fragment>
            {/* Success Modal with Blur Backdrop */}
            {ok && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Blur Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setOk(false)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-white rounded-lg shadow-2xl p-8 max-w-md mx-4 transform transition-all">
                        <div className="text-center">
                            {/* Success Icon */}
                            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-royal-green-soft rounded-full mb-4">
                                <svg className="w-10 h-10 text-royal-green" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            
                            {/* Success Message */}
                            <h3 className="text-2xl font-bold text-royal-green-soft mb-2">
                                Merci de votre inscription !
                            </h3>
                            <p className="text-zinc-600 mb-6">
                                Vérifiez votre boîte e-mail pour confirmer votre inscription à la newsletter.
                            </p>
                            
                            {/* Close Button */}
                            <button
                                onClick={() => setOk(false)}
                                className="px-6 py-3 bg-royal-green text-white rounded-lg font-semibold hover:bg-royal-green/90 transition-colors duration-300"
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-royal-green-soft">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-24">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="mb-6">
                            <span className="text-sm font-medium text-royal-green-soft tracking-wider uppercase">NEWSLETTER</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-bold tracking-tight text-royal-green-soft mb-8">
                            Restez Connectés
                        </h2>
                        <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                            Recevez les dernières actualités, analyses et opportunités d'engagement pour le Maroc Social 2030.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Subscription Form */}
                        <div>
                            <div className="bg-white p-8 rounded-lg border border-royal-green-soft shadow-lg">
                                <h3 className="text-2xl font-semibold text-royal-green-soft mb-6">S'abonner à la newsletter</h3>
                                
                                <form onSubmit={submit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Nom complet</label>
                                            <input 
                                                required 
                                                value={data.nom} 
                                                onChange={(e) => setData('nom', e.target.value)} 
                                                className="w-full p-4 rounded-lg border border-royal-green-soft focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300" 
                                                placeholder="Votre nom complet" 
                                            />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Adresse e-mail</label>
                                        <input 
                                            required 
                                            type="email" 
                                            value={data.email} 
                                            onChange={(e) => setData('email', e.target.value)} 
                                            className="w-full p-4 rounded-lg border border-royal-green-soft focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300" 
                                            placeholder="nom@exemple.com" 
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="w-full py-4 px-8 rounded-lg font-semibold text-lg bg-royal-green text-white hover:bg-royal-green/90 transition-colors duration-300 disabled:opacity-50"
                                    >
                                        {processing ? 'Inscription en cours...' : 'S\'abonner maintenant'}
                                    </button>
                                </form>
                            </div>

           
                    </div>

                    {/* Newsletter Benefits */}
                    <div>
                        <div className="bg-white p-8 rounded-lg border border-royal-green-soft shadow-lg">
                            <h3 className="text-2xl font-semibold text-royal-green-soft mb-6">Ce que vous recevrez</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-royal-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-800 mb-2">Actualités du projet</h4>
                                        <p className="text-zinc-600 text-sm">Les dernières nouvelles sur les groupes de travail et les initiatives en cours.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-royal-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-800 mb-2">Analyses approfondies</h4>
                                        <p className="text-zinc-600 text-sm">Des articles et réflexions sur les enjeux sociaux du Maroc.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-royal-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-800 mb-2">Opportunités d'engagement</h4>
                                        <p className="text-zinc-600 text-sm">Des invitations à participer aux événements et initiatives du projet.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 bg-royal-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-zinc-800 mb-2">Ressources exclusives</h4>
                                        <p className="text-zinc-600 text-sm">Accès en avant-première aux rapports et documents du projet.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-royal-green-soft">
                                <div className="text-center">
                                    <p className="text-sm text-zinc-600 mb-4">
                                        <span className="font-semibold text-royal-green-soft">Respect de votre vie privée :</span><br />
                                        Nous ne partageons jamais vos données personnelles.
                                    </p>
                                    <div className="flex justify-center gap-4 text-xs text-zinc-500">
                                        <span>Désabonnement facile</span>
                                        <span>•</span>
                                        <span>Données sécurisées</span>
                                        <span>•</span>
                                        <span>Pas de spam</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </React.Fragment>
    );
}

