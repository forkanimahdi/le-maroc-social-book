import { useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function ContactSection() {
    const { data, setData, post, processing, reset, errors } = useForm({
        full_name: '',
        email: '',
        role: '',
        subject: '',
        message: '',
    });
    const [sent, setSent] = useState(false);

    const thinkTankUrl = useMemo(() => {
        if (typeof window !== 'undefined') {
            return `${window.location.origin}/#groupes`;
        }
        return 'https://ms2030.org/#groupes';
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                setSent(true);
                reset();
                setTimeout(() => setSent(false), 4000);
            },
        });
    };

    return (
        <section id="contact" className="bg-gradient-to-br from-[#5a0204] via-[#7c0205] to-[#1b4e0b] py-20 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold tracking-[0.3em] uppercase text-gold">Contact</span>
                    <h2 className="text-4xl sm:text-5xl font-bold mt-4" style={{ color: 'var(--gold)' }}>
                        Écrivez-moi directement
                    </h2>
                    <p className="mt-4 text-lg text-white/80 max-w-3xl mx-auto">
                        Vos messages nourrissent mon travail quotidien. Partagez vos idées, vos collaborations ou vos questions et je vous répondrai depuis mon espace administrateur.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-white text-[#4a0506] rounded-3xl p-10 shadow-2xl border border-royal-red-soft">
                        <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--royal-red)' }}>
                            Entrons en conversation
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--royal-red)' }}>Nom complet</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                    placeholder="Votre nom"
                                    required
                                />
                                {errors.full_name && <p className="text-sm text-royal-red mt-1">{errors.full_name}</p>}
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--royal-red)' }}>Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                        placeholder="vous@exemple.com"
                                        required
                                    />
                                    {errors.email && <p className="text-sm text-royal-red mt-1">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--royal-red)' }}>Rôle / Organisation</label>
                                    <input
                                        type="text"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                        placeholder="Ex. Chercheur, Collectif..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--royal-red)' }}>Sujet</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                    placeholder="Objet de votre message"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--royal-red)' }}>Message</label>
                                <textarea
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    rows={6}
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                    placeholder="Expliquez-moi comment je peux vous aider"
                                    required
                                />
                                {errors.message && <p className="text-sm text-royal-red mt-1">{errors.message}</p>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3 rounded-xl font-semibold text-white transition disabled:opacity-60"
                                style={{ backgroundColor: 'var(--royal-red)' }}
                            >
                                {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>

                            {sent && (
                                <div className="mt-3 text-sm font-semibold text-center" style={{ color: 'var(--royal-green)' }}>
                                    Merci pour votre message. Je vous réponds personnellement dès que possible.
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="rounded-3xl p-10 shadow-2xl border border-gold/40" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}>
                        <h3 className="text-2xl font-semibold mb-6" style={{ color: 'var(--gold)' }}>Mes engagements</h3>
                        <p className="text-white/80 leading-relaxed">
                            Chaque échange nourrit mon travail d’autrice et de militante pour un Maroc social. Vos messages restent confidentiels et reçoivent une réponse personnalisée.
                        </p>
                        <div className="space-y-4 mt-8">
                            {[
                                {
                                    title: 'Email direct',
                                    detail: 'mhijiroum@gmail.com'
                                },
                                {
                                    title: 'Site officiel',
                                    detail: 'ms2030.org'
                                },
                                {
                                    title: 'Canal WhatsApp',
                                    detail: 'Recevez les annonces officielles en rejoignant le canal partagé dans mes emails.'
                                },
                            ].map((item, index) => (
                                <div key={index} className="p-4 rounded-2xl border border-gold/40 bg-white/10 backdrop-blur">
                                    <p className="text-sm uppercase tracking-wide font-semibold" style={{ color: 'var(--gold)' }}>{item.title}</p>
                                    <p className="text-lg font-medium">{item.detail}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 p-5 rounded-2xl border border-white/20 bg-white/10">
                            <p className="text-sm uppercase tracking-wide font-semibold text-white/70 mb-2">Think Tank</p>
                            <p className="text-white/90 mb-4">
                                Vous souhaitez contribuer aux chantiers de transformation ? Rejoignez directement l’espace Think Tank du site.
                            </p>
                            <a
                                href={thinkTankUrl}
                                className="inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition hover:scale-105"
                                style={{ backgroundColor: 'var(--gold)', color: '#1b1b1b' }}
                            >
                                Rejoindre le Think Tank
                            </a>
                        </div>

                        <p className="text-sm text-white/70 mt-6">
                            En écrivant via ce formulaire, vous acceptez que je vous contacte par email pour approfondir nos échanges.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}