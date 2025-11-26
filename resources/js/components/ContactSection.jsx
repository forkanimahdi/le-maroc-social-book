import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ContactSection() {
    const { data, setData, post, processing, reset, errors } = useForm({
        full_name: '',
        email: '',
        role: '',
        subject: '',
        message: '',
    });
    const [sent, setSent] = useState(false);

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
        <section id="contact" className="bg-white/80 py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <span className="text-sm font-medium text-royal-red-soft tracking-widest uppercase">Contact</span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-royal-red mt-4">
                        Écrivez-moi directement
                    </h2>
                    <p className="mt-4 text-lg text-zinc-600 max-w-3xl mx-auto">
                        Partagez vos idées, collaborations ou questions. Je lis chaque message et je réponds depuis mon espace administrateur pour rester au plus près de votre démarche.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    <div className="bg-cream/70 border border-royal-red-soft rounded-3xl p-10 shadow-lg">
                        <h3 className="text-2xl font-semibold text-royal-red mb-6">Entrons en conversation</h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Nom complet</label>
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
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1">Email</label>
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
                                    <label className="block text-sm font-semibold text-zinc-700 mb-1">Rôle / Organisation</label>
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
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Sujet</label>
                                <input
                                    type="text"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className="w-full rounded-xl border border-zinc-200 px-4 py-3 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                    placeholder="Objet de votre message"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-zinc-700 mb-1">Message</label>
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
                                className="w-full py-3 rounded-xl font-semibold bg-royal-red text-white hover:bg-royal-red/90 transition disabled:opacity-60"
                            >
                                {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>

                            {sent && (
                                <div className="mt-3 text-sm font-semibold text-royal-green text-center">
                                    Merci pour votre message. Je vous réponds personnellement dès que possible.
                                </div>
                            )}
                        </form>
                    </div>

                    <div className="bg-white border border-gold/40 rounded-3xl p-10 shadow-lg space-y-6">
                        <h3 className="text-2xl font-semibold text-royal-green">Mes engagements</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            Chaque échange nourrit mon travail d’autrice et de militante pour un Maroc social. Vos messages sont lus avec attention et restent confidentiels.
                        </p>
                        <div className="space-y-4">
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
                                    detail: 'Recevez les annonces en rejoignant le canal mentionné dans les emails.'
                                },
                            ].map((item, index) => (
                                <div key={index} className="p-4 rounded-2xl bg-cream/60 border border-gold/40">
                                    <p className="text-sm uppercase tracking-wide text-royal-red font-semibold">{item.title}</p>
                                    <p className="text-lg font-medium text-zinc-800">{item.detail}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-zinc-500">
                            En écrivant via ce formulaire, vous acceptez que je vous réponde par email pour approfondir nos échanges.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}


