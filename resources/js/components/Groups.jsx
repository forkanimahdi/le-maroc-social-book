import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

// Configuration des groupes de travail
const GROUPS_CONFIG = {
    jeunesse: {
        title: 'Groupe de Travail 1 — Jeunesse, Éducation et Emploi',
        shortTitle: 'Jeunesse, Éducation et Emploi',
        description: 'Redonner à la jeunesse marocaine les moyens d\'apprendre, de s\'orienter, de travailler et d\'exister pleinement dans un pays qui reconnaît ses capacités et ses aspirations.',
        objectives: [
            'Lutte contre le décrochage scolaire et rehaussement des apprentissages',
            'Orientation, formation professionnelle et métiers du futur',
            'Égalité territoriale des opportunités éducatives et professionnelles',
            'Insertion, mobilité sociale et autonomisation des jeunes'
        ]
    },
    femmes: {
        title: 'Groupe de Travail 2 — Femmes, Travail Invisible et Sécurité Sociale',
        shortTitle: 'Femmes, Travail Invisible et Sécurité Sociale',
        description: 'Reconnaître, protéger et valoriser la contribution des femmes à l\'économie et à la cohésion sociale, tout en combattant les violences et les discriminations qui limitent leur pouvoir d\'agir.',
        objectives: [
            'Reconnaissance du travail non rémunéré (care, tâches domestiques, assistance maternelle)',
            'Création et professionnalisation des métiers de l\'assistante maternelle à domicile',
            'Lutte contre les violences basées sur le genre',
            'Égalité économique, droits sociaux et participation des femmes à la vie publique'
        ]
    },
    vieillissement: {
        title: 'Groupe de Travail 3 — Vieillissement, Santé de la Population et Transitions Démographiques',
        shortTitle: 'Vieillissement, Santé et Transitions Démographiques',
        description: 'Préparer le Maroc au choc démographique en construisant une société intergénérationnelle qui protège les aînés, accompagne les familles et développe les métiers du care de demain.',
        objectives: [
            'Adaptation du système social au vieillissement rapide de la population',
            'Développement des services d\'aide à domicile, d\'accompagnement et d\'assistance',
            'Santé reproductive, fertilité et nouveaux enjeux familiaux',
            'Dignité, autonomie et inclusion des personnes âgées'
        ]
    },
    pacte: {
        title: 'Groupe de Travail 4 — Pacte National, Territoires et Engagement Citoyen',
        shortTitle: 'Pacte National, Territoires et Engagement Citoyen',
        description: 'Refonder le contrat social marocain autour de la participation, du volontariat, de l\'intelligence collective et d\'une nouvelle gouvernance territoriale.',
        objectives: [
            'Renforcement de l\'engagement civique et des dispositifs de volontariat national',
            'Émergence de territoires connectés, inclusifs et moteurs de cohésion',
            'Mise en marche du Conseil National de la Jeunesse et nouvelles instances de participation',
            'Réinvention du pacte social, de la confiance et du lien État-citoyens'
        ]
    }
};


export default function Groups() {
    const { data, setData, post, processing, reset } = useForm({
        group: 'jeunesse',
        nom: '',
        email: '',
        linkedin_url: '',
        cv: null,
        presentation: '',
        domaine: '',
        domain_expertise: '',
        motivation: '',
    });

    const { links = {} } = usePage().props;
    const channelFallback = links.whatsappChannel || 'https://whatsapp.com/channel/0029VbBiZRoBqbr6YF6zgE3i';

    const [showWhatsAppDialog, setShowWhatsAppDialog] = useState(false);
    const [whatsappChannelLink, setWhatsappChannelLink] = useState(channelFallback);

    const submit = (e) => {
        e.preventDefault();
        post('/groups', {
            onSuccess: (page) => {
                const nextLink = page.props?.whatsapp_channel_link
                    || page.props?.whatsapp_community_link
                    || channelFallback;

                setWhatsappChannelLink(nextLink);
                setShowWhatsAppDialog(true);
                reset();
            },
            onError: (errors) => {
                console.error('Registration error:', errors);
            }
        });
    };

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
                        REJOIGNEZ LE THINK TANK
                    </h2>
                    <p className="text-xl leading-relaxed text-zinc-600 max-w-4xl mx-auto">
                        Quatre groupes de travail réunissant citoyens, experts, représentants du secteur public et privé, sociologues, jeunes, société civile, décideurs et diplomates.
                    </p>
                </div>

                {/* Groups Overview */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {Object.entries(GROUPS_CONFIG).map(([key, group]) => (
                        <div key={key} className="bg-royal-green-soft p-6 rounded-lg border border-royal-green-soft hover:bg-royal-green-soft/80 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-royal-green-soft mb-3">{group.shortTitle || group.title}</h3>
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
                                        <option value="jeunesse">Groupe de Travail 1 — Jeunesse, Éducation et Emploi</option>
                                        <option value="femmes">Groupe de Travail 2 — Femmes, Travail Invisible et Sécurité Sociale</option>
                                        <option value="vieillissement">Groupe de Travail 3 — Vieillissement, Santé de la Population et Transitions Démographiques</option>
                                        <option value="pacte">Groupe de Travail 4 — Pacte National, Territoires et Engagement Citoyen</option>
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
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Lien LinkedIn <span className="text-xs font-normal normal-case">(optionnel)</span></label>
                                    <input
                                        type="url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300"
                                        placeholder="https://www.linkedin.com/in/votre-profil"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">CV <span className="text-xs font-normal normal-case">(optionnel)</span></label>
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setData('cv', e.target.files[0])}
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-royal-green-soft file:text-royal-green-soft hover:file:bg-royal-green-soft/80"
                                    />
                                    <p className="text-xs text-zinc-600 mt-2">Formats acceptés : PDF, DOC, DOCX (max 10 Mo)</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Présentez-vous <span className="text-red-500">*</span></label>
                                    <textarea
                                        required
                                        rows={4}
                                        maxLength={250}
                                        value={data.presentation}
                                        onChange={(e) => setData('presentation', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300 resize-none"
                                        placeholder="Présentez-vous en quelques mots (250 caractères maximum)"
                                    />
                                    <p className="text-xs text-zinc-600 mt-2 text-right">
                                        {data.presentation.length}/250 caractères
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Domain expertise</label>
                                    <input
                                        required
                                        value={data.domain_expertise}
                                        onChange={(e) => setData('domain_expertise', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-royal-green-soft bg-white text-zinc-800 focus:border-royal-green focus:ring-2 focus:ring-royal-green/20 transition-all duration-300"
                                        placeholder="Ex. Politiques publiques, Recherche et analyse, Entrepreneuriat social..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-royal-green-soft mb-3 uppercase tracking-wide">Motivation</label>
                                    <textarea
                                        required
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
                                    className="w-full py-4 px-8 rounded-lg font-semibold text-lg transition-colors duration-300 disabled:opacity-50"
                                    style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                >
                                    {processing ? 'Inscription en cours...' : 'S\'inscrire au groupe'}
                                </button>

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
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--royal-green)' }}>
                                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                                </div>
                                                <span className="text-zinc-700">{objective}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* WhatsApp Channel Dialog */}
            <Dialog open={showWhatsAppDialog} onOpenChange={setShowWhatsAppDialog}>
                <DialogContent className="max-w-md bg-white">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
                            Merci pour votre inscription !
                        </DialogTitle>
                        <DialogDescription className="text-zinc-600">
                            Votre candidature a été enregistrée avec succès.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(27, 78, 11, 0.08)' }}>
                            <p className="text-zinc-700 mb-4">
                                En attendant l'examen de votre candidature, nous vous invitons à rejoindre notre <strong>canal WhatsApp officiel</strong> pour suivre toutes les annonces et publications du Think Tank.
                            </p>
                            <a
                                href={whatsappChannelLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-semibold text-base hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-lg"
                                style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                </svg>
                                Ouvrir le canal WhatsApp
                            </a>
                        </div>
                        <p className="text-sm text-zinc-600 text-center">
                            Vous recevrez un e-mail de confirmation avec tous les détails. Une fois votre candidature approuvée, vous recevrez le lien vers le groupe WhatsApp officiel.
                        </p>
                        <button
                            onClick={() => setShowWhatsAppDialog(false)}
                            className="w-full py-2 px-4 rounded-lg font-semibold border-2 text-sm"
                            style={{ borderColor: 'var(--royal-green)', color: 'var(--royal-green)' }}
                        >
                            Fermer
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}


