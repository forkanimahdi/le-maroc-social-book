import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useForm } from '@inertiajs/react';

export default function Hero() {
    const [showEventModal, setShowEventModal] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        full_name: '',
        role: '',
        email: '',
        phone: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleModalChange = (isOpen) => {
        setShowEventModal(isOpen);
        if (!isOpen) {
            setSubmitted(false);
        }
    };

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const syncWithHash = () => {
            setShowEventModal(window.location.hash === '#register');
        };

        syncWithHash();
        window.addEventListener('hashchange', syncWithHash);

        return () => window.removeEventListener('hashchange', syncWithHash);
    }, []);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const baseUrl = `${window.location.pathname}${window.location.search}`;

        if (showEventModal) {
            if (window.location.hash !== '#register') {
                window.history.replaceState(null, '', `${baseUrl}#register`);
            }
        } else if (window.location.hash === '#register') {
            window.history.replaceState(null, '', baseUrl);
        }
    }, [showEventModal]);

    const handleEventRegistration = (e) => {
        e.preventDefault();
        post('/event-participants', {
            onSuccess: () => {
                setSubmitted(true);
                reset();
                setTimeout(() => {
                    handleModalChange(false);
                }, 3000);
            },
            onError: (errors) => {
                console.error('Registration error:', errors);
            }
        });
    };

    return (
        <header id="accueil" className="relative isolate overflow-hidden">
            <div
                className="relative min-h-screen"
                style={{
                    backgroundImage: `linear-gradient(90deg, color-mix(in oklab, var(--royal-red) 35%, transparent), color-mix(in oklab, var(--gold) 25%, transparent)), url(/assets/hero.png)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-36 pb-28 h-screen flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end w-full">
                        {/* Left content */}
                        <div className="text-white">
                            <div className="mb-4">
                                <span className="text-sm font-medium text-gold tracking-wider uppercase">BOOK GUIDELINE</span>
                            </div>
                            <h1 className="text-5xl minion-bold sm:text-7xl font-bold tracking-tight leading-tight mb-6">
                                LE MAROC<br />
                                <span className="text-gold">SOCIAL 2030</span>
                            </h1>
                            <p className="text-xl leading-relaxed text-white/90 mb-8 max-w-4/5">
                                Quatre Chantiers de Dignité pour insuffler un Maroc Social en 2030
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="#livre" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.querySelector('#livre');
                                        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
                                    }}
                                    className="bg-royal-red px-2 py-3 rounded-lg hover:opacity-95 text-center text-white font-semibold"
                                >
                                    Découvrir le livre <br /> <i className='text-sm font-light'>à partir du 28.01.2026</i>
                                </a>
                                <a 
                                    href="#livre" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.querySelector('#livre');
                                        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
                                    }}
                                    className="bg-royal-red px-2 py-3 rounded-lg hover:opacity-95 text-center text-white font-semibold"
                                >
                                    Télécharger le résumé 
                                </a>
                                <a 
                                    href="#groupes" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.querySelector('#groupes');
                                        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
                                    }}
                                    className="bg-royal-red px-2 py-3 rounded-lg hover:opacity-95 text-center text-white font-semibold"
                                >
                                    Groupes de travail
                                </a>
                            </div>
                        </div>
                        
                        {/* Right content - Author info */}
                        <div className="text-right text-white pb-6">
                            <div className="inline-block">
                                <div className="text-sm font-medium text-gold tracking-wider uppercase mb-2">AUTHOR</div>
                                <div className="text-2xl font-semibold text-cream">OUMAIMA MHIJIR</div>
                                <div className="mt-4 text-white/80 text-base max-w-xs ml-auto">
                                    Auteure, experte en entrepreneuriat social international, maman, étudiante en psychologie et en innovation sociale
                                </div>
                                <button
                                    onClick={() => handleModalChange(true)}
                                    className="mt-6 px-6 capitalize py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                                    style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                >
                                    évènement de lancement
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Registration Modal */}
            <Dialog open={showEventModal} onOpenChange={handleModalChange}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
                            Réserver une place
                        </DialogTitle>
                        <DialogDescription className="text-zinc-600">
                            Inscrivez-vous pour participer à l'événement de lancement du livre
                        </DialogDescription>
                    </DialogHeader>
                    {submitted ? (
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--royal-green)' }}>Merci !</h3>
                            <p className="text-zinc-600">
                                Votre demande d'inscription a été enregistrée. Vous recevrez un e-mail de confirmation.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleEventRegistration} className="space-y-4 py-4">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Nom complet *</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all"
                                    placeholder="Votre nom complet"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Rôle / Profession *</label>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all"
                                    placeholder="Ex. Entrepreneur, Étudiant, Chercheur..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all"
                                    placeholder="nom@exemple.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Numéro de téléphone *</label>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all"
                                    placeholder="+212 6XX XXX XXX"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                >
                                    {processing ? 'Envoi en cours...' : 'S\'inscrire'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleModalChange(false)}
                                    className="px-6 py-3 rounded-lg font-semibold border-2 transition-all"
                                    style={{ borderColor: 'var(--royal-red)', color: 'var(--royal-red)' }}
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </header>
    );
}

