import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useForm } from '@inertiajs/react';

export default function Hero() {
    const [showEventModal, setShowEventModal] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        full_name: '',
        organization: '',
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
                            <p className="text-xl leading-relaxed text-white/90 mb-10 max-w-xl">
                                Quatre Chantiers de Dignité pour insuffler un Maroc Social en 2030
                            </p>
                            {/* Single primary CTA — marketing best practice */}
                            <div className="flex flex-col-reverse sm:flex-row items-center gap-4">
                                <a
                                    href="https://wa.me/p/25478168265188532/212669825632"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[220px] py-3 px-5 sm:py-4 sm:px-8 rounded-xl font-bold text-base sm:text-lg text-white shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                    style={{ backgroundColor: 'var(--royal-green)' }}
                                >
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    Acheter le livre
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
                                {/* <button
                                    onClick={() => handleModalChange(true)}
                                    className="mt-6 px-6 capitalize py-3 rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
                                    style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                >
                                    évènement de lancement
                                </button> */}
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
                            Réserver votre place
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
                                <label className="block text-sm font-semibold text-zinc-700 mb-2">Organisation</label>
                                <input
                                    type="text"
                                    value={data.organization}
                                    onChange={(e) => setData('organization', e.target.value)}
                                    className="w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20 transition-all"
                                    placeholder="Votre organisation"
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

