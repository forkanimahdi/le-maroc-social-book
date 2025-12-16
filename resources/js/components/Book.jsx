import React, { useState } from 'react';
import Tabs from './ui/Tabs.jsx';
import QuoteModal from './ui/QuoteModal.jsx';
import PolicyModal from './ui/PolicyModal.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useForm, usePage } from '@inertiajs/react';

export default function Book() {
    const [open, setOpen] = useState(false);
    const [showPolicy, setShowPolicy] = useState(false);
    const { data, setData, post, processing, reset } = useForm({
        prenom: '',
        nom: '',
        email: '',
        pays: '',
        version: 'français',
        acceptTerms: false,
    });
    const [sent, setSent] = useState(false);
    const { links = {} } = usePage().props;
    const businessWhatsapp = links.businessWhatsapp || 'https://wa.me/212724732762';

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!data.acceptTerms) {
            alert('Veuillez accepter les conditions d\'utilisation et la politique de confidentialité');
            return;
        }
        
        post('/book/executive-summary', {
            onSuccess: () => {
                setSent(true);
            },
            onError: (errors) => {
                console.error('Erreur lors de l\'envoi:', errors);
            }
        });
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
                        Un ouvrage d'anticipation sociale et de mobilisation nationale qui propose une vision partagée pour reconstruire la cohésion, renforcer l'équité et garantir la dignité de chaque citoyen à l'horizon du Momentum de 2030.
                    </p>
                </div>

                {/* CTA Cards - Side by Side */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {/* Executive Summary Card */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'rgba(134, 2, 5, 0.08)' }}>
                        <div className="relative p-8 h-full flex flex-col">
                            {/* Icon and Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(134, 2, 5, 0.15)' }}>
                                    <svg className="w-7 h-7" style={{ color: 'var(--royal-red)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--royal-red)' }}>Résumé Exécutif</h3>
                                    <p className="text-sm text-zinc-600">Executive Summary</p>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <p className="text-zinc-700 mb-6 leading-relaxed flex-grow text-left">
                                Recevez le résumé exécutif par e-mail pour découvrir les points clés du livre et les recommandations principales.
                            </p>
                            
                            {/* CTA Button */}
                            <button 
                                onClick={() => setOpen(true)} 
                                className="w-full py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn"
                                style={{ backgroundColor: 'var(--royal-red)', color: 'white' }}
                            >
                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Télécharger le résumé
                            </button>
                        </div>
                    </div>
                    
                    {/* Buy Book Card */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'rgba(27, 78, 11, 0.08)' }}>
                        <div className="relative p-8 h-full flex flex-col">
                            {/* Icon and Header */}
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(27, 78, 11, 0.15)' }}>
                                    <svg className="w-7 h-7" style={{ color: 'var(--royal-green)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--royal-green)' }}>Acheter le livre <i className='text-sm'>à partir du 28.01.2026</i></h3>
                                    <p className="text-sm text-zinc-600">Édition complète</p>
                                </div>
                            </div>
                            
                            {/* Description */}
                            <p className="text-zinc-700 mb-6 leading-relaxed flex-grow text-left animate-">
                            Ce livre est à but non lucratif ; les revenus générés serviront à financer le Think Tank.                            </p>
                            
                            {/* CTA Button */}
                            <button 
                                onClick={() => window.open("https://wa.me/212724732762", '_blank')}
                                className="w-full py-4 px-6 rounded-xl font-bold text-lg hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn "
                                style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                            >
                                <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Acheter le livre
                            </button>
                            
                            {/* Non-profit badge */}
                            {/* <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span>Projet à but non lucratif</span>
                            </div> */}
                        </div>
                    </div>
                </div>

                {/* Tabs Section - Full Width Below */}
                <div className="w-full">
                    <Tabs
                        tabs={[
                            { label: 'Présentation', content: (
                                <div className="p-8 rounded-lg shadow-md" style={{ backgroundColor: 'rgba(134, 2, 5, 0.08)' }}>
                                    <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--royal-red)' }}>Vision éditoriale :</h3>
                                    <p className="text-lg leading-relaxed text-zinc-700">
                                        Une perspective transversale qui croise politiques publiques, dynamiques sociales et intelligence citoyenne, afin d'offrir une lecture cohérente et opérationnelle des défis du Maroc à l'horizon 2030.
                                    </p>
                                </div>
                            )},
                            { label: 'Extraits', content: (
                                <div className="grid md:grid-cols-3 gap-6">
                                    <button 
                                        className="group relative overflow-hidden p-6 text-left hover:opacity-90 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02]" 
                                        style={{ backgroundColor: 'rgba(134, 2, 5, 0.08)' }}
                                        onClick={() => setOpen({ type: 'quote1' })}
                                    >
                                        <div className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--royal-red)' }}>Citation</div>
                                        <blockquote className="text-lg italic text-zinc-700 leading-relaxed">
                                            « ...Je rêve d'un Maroc où une idée née à Zagora peut rayonner à Tanger, où l'on ne demande plus à un jeune d'où il vient, mais où il peut aller... »
                                        </blockquote>
                                    </button>
                                    <button 
                                        className="group relative overflow-hidden p-6 text-left hover:opacity-90 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02]" 
                                        style={{ backgroundColor: 'rgba(27, 78, 11, 0.08)' }}
                                        onClick={() => setOpen({ type: 'quote2' })}
                                    >
                                        <div className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--royal-green)' }}>Citation</div>
                                        <blockquote className="text-lg italic text-zinc-700 leading-relaxed">
                                            « .... Nous avons déjà prouvé que nous savons nous lever ensemble : il est temps de transformer cette force en politique publique durable... »
                                        </blockquote>
                                    </button>
                                    <button 
                                        className="group relative overflow-hidden p-6 text-left hover:opacity-90 transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02]" 
                                        style={{ backgroundColor: 'rgba(134, 2, 5, 0.08)' }}
                                        onClick={() => setOpen({ type: 'quote3' })}
                                    >
                                        <div className="text-xs sm:text-sm font-medium mb-3 uppercase tracking-wide" style={{ color: 'var(--royal-red)' }}>Citation</div>
                                        <blockquote className="text-lg italic text-zinc-700 leading-relaxed">
                                            « Le Maroc de 2030 doit être un pays où l'État trace la route, mais où les territoires, de Marrakech à Chefchaouen, la parcourent avec la même capacité d'agir. »
                                        </blockquote>
                                    </button>
                                </div>
                            )},
                            { label: 'Messages clés', content: (
                                <div className="p-8 rounded-lg shadow-md" style={{ backgroundColor: 'rgba(204, 185, 116, 0.15)' }}>
                                    <h3 className="text-2xl font-semibold mb-8" style={{ color: 'black' }}>Piliers fondamentaux</h3>
                                    <ul className="space-y-6" style={{ color: 'black' }}>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }}></div>
                                            <span className="text-lg leading-relaxed">Jeunesse et emploi : transformer les politiques publiques autour des néo-NEET - Next Entrepreneurs, Educators & Transformers.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }}></div>
                                            <span className="text-lg leading-relaxed">Femmes et égalité réelle : traduire les réformes juridiques en avancées concrètes et mesurables.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }}></div>
                                            <span className="text-lg leading-relaxed">Solidarités et inclusion intergénérationnelle : retisser les liens entre classes, territoires et âges.</span>
                                        </li>
                                        <li className="flex items-start gap-4">
                                            <div className="w-3 h-3 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: 'var(--gold)' }}></div>
                                            <span className="text-lg leading-relaxed">Gouvernance et service public de confiance : bâtir un État social moderne, transparent et à l'écoute</span>
                                        </li>
                                    </ul>
                                </div>
                            )},
                        ]}
                    />
                </div>
            </div>

            {/* Quote modal */}
            {open && typeof open === 'object' && open.type?.startsWith('quote') && (
                <QuoteModal 
                    open={true} 
                    onClose={() => setOpen(false)} 
                    variant={open.type === 'quote2' ? 'green' : 'red'} 
                    quote={
                        open.type === 'quote1' 
                            ? "...Je rêve d'un Maroc où une idée née à Zagora peut rayonner à Tanger, où l'on ne demande plus à un jeune d'où il vient, mais où il peut aller..."
                            : open.type === 'quote2'
                            ? ".... Nous avons déjà prouvé que nous savons nous lever ensemble : il est temps de transformer cette force en politique publique durable..."
                            : "Le Maroc de 2030 doit être un pays où l'État trace la route, mais où les territoires, de Marrakech à Chefchaouen, la parcourent avec la même capacité d'agir."
                    } 
                    author="Oumaima Mhijir" 
                />
            )}

            {/* Policy Modal */}
            <PolicyModal open={showPolicy} onClose={() => setShowPolicy(false)} />

            {/* Download Modal - Using Dialog component */}
            <Dialog open={open === true} onOpenChange={(isOpen) => { if (!isOpen) { setOpen(false); setSent(false); reset(); } }}>
                <DialogContent className="max-w-2xl max-h-[90vh] bg-white  overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl sm:text-2xl py-5 text-black font-bold ">Télécharger le Résumé Exécutif</DialogTitle>
                        <DialogDescription className="text-[#860205]">
                            Recevez le résumé par e‑mail avec pièce jointe
                        </DialogDescription>
                    </DialogHeader>
                    
                    {!sent ? (
                        <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                                <div>
                                    <label className="block text-sm font-semibold  mb-2 sm:mb-3 uppercase tracking-wide">Prénom</label>
                                    <input 
                                        required 
                                        value={data.prenom} 
                                        onChange={(e) => setData('prenom', e.target.value)} 
                                        className="w-full p-3 sm:p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all text-sm sm:text-base" 
                                        placeholder="Votre prénom" 
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold  mb-2 sm:mb-3 uppercase tracking-wide">Nom</label>
                                    <input 
                                        required 
                                        value={data.nom} 
                                        onChange={(e) => setData('nom', e.target.value)} 
                                        className="w-full p-3 sm:p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all text-sm sm:text-base" 
                                        placeholder="Votre nom" 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold  mb-2 sm:mb-3 uppercase tracking-wide">E‑mail</label>
                                <input 
                                    required 
                                    type="email" 
                                    value={data.email} 
                                    onChange={(e) => setData('email', e.target.value)} 
                                    className="w-full p-3 sm:p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all text-sm sm:text-base" 
                                    placeholder="nom@exemple.com" 
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold  mb-2 sm:mb-3 uppercase tracking-wide">Pays</label>
                                <input 
                                    value={data.pays} 
                                    onChange={(e) => setData('pays', e.target.value)} 
                                    className="w-full p-3 sm:p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all text-sm sm:text-base" 
                                    placeholder="Maroc" 
                                />
                            </div>

                            <div className='hidden'> 
                                <label className="block text-sm font-semibold  mb-2 sm:mb-3 uppercase tracking-wide">Version du livre</label>
                                <select 
                                    value={data.version} 
                                    onChange={(e) => setData('version', e.target.value)} 
                                    className="w-full p-3 sm:p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all text-sm sm:text-base"
                                >
                                    <option value="français">Français</option>
                                    <option value="arabe">Arabe</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-royal-green-soft">
                                <label className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative mt-1 flex-shrink-0">
                                        <input 
                                            type="checkbox" 
                                            checked={data.acceptTerms} 
                                            onChange={(e) => setData('acceptTerms', e.target.checked)} 
                                            required 
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                            data.acceptTerms 
                                                ? 'bg-royal-green border-royal-green' 
                                                : 'border-royal-green/50 group-hover:border-royal-green'
                                        }`}>
                                            {data.acceptTerms && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <span className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                                        J'accepte les{' '}
                                        <button 
                                            type="button"
                                            onClick={(e) => { e.preventDefault(); setShowPolicy(true); }} 
                                            className="text-royal-green hover:underline font-semibold"
                                        >
                                            conditions d'utilisation et la politique de confidentialité
                                        </button>
                                        {' '}conformément aux règles CNDP (loi 09-08) du Maroc concernant l'utilisation de mes données personnelles pour l'envoi du résumé exécutif.
                                    </span>
                                </label>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                <button 
                                    type="submit" 
                                    disabled={processing || !data.acceptTerms}
                                    className="flex-1 py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg bg-royal-red text-white hover:bg-royal-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? 'Envoi en cours...' : 'Télécharger le résumé'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => { setOpen(false); setSent(false); reset(); }} 
                                    className="py-3 sm:py-4 px-6 rounded-lg font-semibold border-2 border-royal-green text-[#860205] hover:bg-royal-green-soft transition-colors text-sm sm:text-base"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center py-6 sm:py-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-royal-green rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h4 className="text-xl sm:text-2xl font-bold text-royal-green mb-2 sm:mb-3">Merci !</h4>
                            <p className="text-zinc-700 text-base sm:text-lg mb-2">Le résumé exécutif vous a été envoyé par e‑mail.</p>
                            <p className="text-zinc-600 text-sm mb-4 sm:mb-6">Vérifiez votre boîte de réception et vos spams.</p>
                            <button 
                                onClick={() => { setOpen(false); setSent(false); reset(); }} 
                                className="py-3 px-6 rounded-lg font-semibold bg-royal-green text-white hover:bg-royal-green/90 transition-colors text-sm sm:text-base"
                            >
                                Fermer
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}


