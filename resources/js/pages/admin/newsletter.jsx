import AppLayout from '@/layouts/app-layout';
import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Newsletter', href: '/admin/newsletter' },
];


function NewsletterPreview({ newsletter }) {
    const [showPreview, setShowPreview] = useState(false);
    
    return (
        <>
            <div 
                className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setShowPreview(true)}
            >
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-zinc-800">{newsletter.subject}</h3>
                    <span className="text-sm text-zinc-500">
                        {new Date(newsletter.sent_at).toLocaleDateString('fr-FR', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </span>
                </div>
                <div className="text-sm text-zinc-600">
                    <span>Destinataires: </span>
                    <span className="font-medium">{newsletter.recipients_count || 0}</span>
                </div>
            </div>
            
            <Dialog open={showPreview} onOpenChange={setShowPreview}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle style={{ color: 'var(--royal-red)' }}>{newsletter.subject}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="text-sm text-zinc-500 mb-4">
                            Envoyée le {new Date(newsletter.sent_at).toLocaleDateString('fr-FR', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })} à {newsletter.recipients_count || 0} destinataires
                        </div>
                        <div 
                            className="prose max-w-none"
                            dangerouslySetInnerHTML={{ __html: newsletter.content }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default function Newsletter({ subscribers = [], newsletters = [], subscriberStats = { active: 0, inactive: 0, total: 0 } }) {
    const [activeTab, setActiveTab] = useState('subscribers');
    
    const { data: newsletterData, setData: setNewsletterData, post: sendNewsletter, processing } = useForm({
        subject: '',
        content: '',
    });

    const handleSendNewsletter = (e) => {
        e.preventDefault();
        sendNewsletter('/admin/newsletter/send');
    };

    const handleToggleSubscriber = (subscriber) => {
        router.post(`/admin/newsletter/subscribers/${subscriber.id}/toggle`, {}, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion Newsletter" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">Gestion Newsletter</h1>
                                <p className="text-zinc-600 mt-1">Gérez vos abonnés et envoyez des newsletters</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-zinc-600">Abonnés actifs</p>
                                    <p className="text-2xl font-bold text-royal-red-soft">{subscriberStats.active}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                        <div className="flex gap-2">
                            {[
                                { id: 'subscribers', label: 'Abonnés' },
                                { id: 'compose', label: 'Composer' },
                                { id: 'history', label: 'Historique' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                        activeTab === tab.id 
                                            ? 'bg-royal-red text-white' 
                                            : 'text-zinc-600 hover:bg-royal-red-soft hover:text-royal-red'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Subscribers Tab */}
                    {activeTab === 'subscribers' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-royal-red-soft">Liste des Abonnés</h2>
                                <a
                                    href="/admin/newsletter/export"
                                    className="inline-flex items-center px-4 py-2 rounded-lg font-semibold transition-colors"
                                    style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                >
                                    Exporter Excel
                                </a>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-zinc-200">
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Nom</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Email</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Date d'inscription</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Statut</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subscribers.map(subscriber => {
                                            const isActive = !subscriber.unsubscribed_at;
                                            return (
                                            <tr key={subscriber.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                                                <td className="py-3 px-4 text-zinc-800">{subscriber.nom || '—'}</td>
                                                <td className="py-3 px-4 text-zinc-600">{subscriber.email}</td>
                                                <td className="py-3 px-4 text-zinc-600">
                                                    {new Date(subscriber.created_at).toLocaleDateString('fr-FR')}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-zinc-200 text-zinc-700'}`}>
                                                        {isActive ? 'Actif' : 'Désinscrit'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button 
                                                        size="sm" 
                                                        variant="outline"
                                                        onClick={() => handleToggleSubscriber(subscriber)}
                                                        className={`${isActive ? 'text-red-600 border-red-200 hover:bg-red-50' : 'text-green-700 border-green-200 hover:bg-green-50'}`}
                                                    >
                                                        {isActive ? 'Désabonner' : 'Réactiver'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        )})}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Compose Tab */}
                    {activeTab === 'compose' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Composer une Newsletter</h2>
                            
                            <form onSubmit={handleSendNewsletter} className="space-y-6">
                                <div>
                                    <Label htmlFor="subject" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Sujet</Label>
                                    <Input
                                        id="subject"
                                        value={newsletterData.subject}
                                        onChange={(e) => setNewsletterData('subject', e.target.value)}
                                        placeholder="Sujet de votre newsletter"
                                        className="mt-2"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="content" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Contenu</Label>
                                    <Textarea
                                        id="content"
                                        value={newsletterData.content}
                                        onChange={(e) => setNewsletterData('content', e.target.value)}
                                        placeholder="Contenu de votre newsletter..."
                                        rows={10}
                                        className="mt-2"
                                        required
                                    />
                                </div>

                                <div className="bg-zinc-50 p-4 rounded-lg">
                                    <p className="text-sm text-zinc-600 mb-2">
                                        <strong>Destinataires:</strong> {subscriberStats.active} abonnés actifs
                                    </p>
                                    <p className="text-xs text-zinc-500">
                                        La newsletter sera envoyée aux abonnés actifs uniquement.
                                    </p>
                                </div>

                                <div className="flex gap-4">
                                    <Button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-royal-red text-white hover:bg-royal-red/90"
                                    >
                                        {processing ? 'Envoi en cours...' : 'Envoyer Newsletter'}
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        onClick={() => setNewsletterData({ subject: '', content: '' })}
                                    >
                                        Annuler
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* History Tab */}
                    {activeTab === 'history' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Historique des Newsletters</h2>
                            
                            <div className="space-y-4">
                                {newsletters.length === 0 ? (
                                    <p className="text-zinc-500 text-center py-8">Aucune newsletter envoyée pour le moment.</p>
                                ) : (
                                    newsletters.map(newsletter => (
                                        <NewsletterPreview key={newsletter.id} newsletter={newsletter} />
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
