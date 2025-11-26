import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Reply, Search } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Messages', href: '/admin/messages' },
];

export default function AdminMessages() {
    const { messages = [], stats = {} } = usePage().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedId, setSelectedId] = useState(messages[0]?.id || null);
    const selectedMessage = messages.find((message) => message.id === selectedId);
    const { data, setData, post, processing, reset } = useForm({ reply: '' });

    useEffect(() => {
        setData('reply', selectedMessage?.reply || '');
    }, [selectedId, selectedMessage?.reply]);

    const filteredMessages = useMemo(() => {
        return messages.filter((message) => {
            const matchesSearch =
                message.full_name?.toLowerCase().includes(search.toLowerCase()) ||
                message.email?.toLowerCase().includes(search.toLowerCase()) ||
                message.subject?.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter ? message.status === statusFilter : true;
            return matchesSearch && matchesStatus;
        });
    }, [messages, search, statusFilter]);

    useEffect(() => {
        if (filteredMessages.length === 0) {
            setSelectedId(null);
            return;
        }

        if (!filteredMessages.some((message) => message.id === selectedId)) {
            setSelectedId(filteredMessages[0].id);
        }
    }, [filteredMessages, selectedId]);

    const handleReply = (e) => {
        e.preventDefault();
        if (!selectedMessage) return;

        post(`/admin/messages/${selectedMessage.id}/reply`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Messages" />
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">Messages reçus</h1>
                                <p className="text-zinc-600 mt-1">Répondez directement aux messages envoyés depuis la page publique.</p>
                            </div>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <p className="text-sm text-zinc-500">Total</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--royal-red)' }}>{stats.total || 0}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-zinc-500">En attente</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>{stats.pending || 0}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-zinc-500">Répondus</p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>{stats.replied || 0}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                        <Card className="lg:col-span-1 border border-royal-red-soft">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-royal-red-soft">
                                    <Search className="w-4 h-4" />
                                    Filtres
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Rechercher par nom, email ou sujet"
                                    className="border-zinc-200"
                                />
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm"
                                >
                                    <option value="">Tous les statuts</option>
                                    <option value="pending">En attente</option>
                                    <option value="replied">Répondu</option>
                                </select>
                                <div className="space-y-2 max-h-[480px] overflow-y-auto">
                                    {filteredMessages.length === 0 && (
                                        <p className="text-sm text-zinc-500 text-center py-6">Aucun message trouvé.</p>
                                    )}
                                    {filteredMessages.map((message) => (
                                        <button
                                            key={message.id}
                                            onClick={() => setSelectedId(message.id)}
                                            className={`w-full text-left p-3 rounded-lg border transition ${
                                                selectedId === message.id
                                                    ? 'border-royal-red bg-royal-red/10'
                                                    : 'border-zinc-200 hover:border-royal-red/50'
                                            }`}
                                        >
                                            <p className="font-semibold text-sm text-zinc-800">{message.full_name}</p>
                                            <p className="text-xs text-zinc-500">{message.email}</p>
                                            <p className="text-xs mt-2 text-zinc-600 line-clamp-2">{message.subject || 'Sans sujet'}</p>
                                            <span className={`inline-flex mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                                                message.status === 'pending'
                                                    ? 'bg-gold/20 text-royal-red'
                                                    : 'bg-green-100 text-green-700'
                                            }`}>
                                                {message.status === 'pending' ? 'En attente' : 'Répondu'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2 border border-royal-red-soft">
                            <CardHeader>
                                <CardTitle className="text-royal-red-soft flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    {selectedMessage ? selectedMessage.subject || 'Message' : 'Sélectionnez un message'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {selectedMessage ? (
                                    <>
                                        <div className="bg-cream/70 rounded-xl p-4 border border-gold/40">
                                            <p className="text-sm text-zinc-600">De</p>
                                            <p className="text-lg font-semibold text-zinc-800">{selectedMessage.full_name}</p>
                                            <p className="text-sm text-zinc-500">{selectedMessage.email}</p>
                                            {selectedMessage.role && (
                                                <p className="text-sm text-zinc-500">{selectedMessage.role}</p>
                                            )}
                                        </div>
                                        <div className="bg-white rounded-xl border border-zinc-200 p-4">
                                            <p className="text-sm text-zinc-600 mb-2">Message</p>
                                            <p className="text-zinc-800 whitespace-pre-line">{selectedMessage.message}</p>
                                        </div>

                                        <form onSubmit={handleReply} className="space-y-4">
                                            <label className="text-sm font-semibold text-zinc-700 flex items-center gap-2">
                                                <Reply className="w-4 h-4" />
                                                Réponse
                                            </label>
                                            <Textarea
                                                value={data.reply}
                                                onChange={(e) => setData('reply', e.target.value)}
                                                rows={6}
                                                className="w-full"
                                                placeholder="Écrivez votre réponse..."
                                                required
                                            />
                                            <Button
                                                type="submit"
                                                disabled={processing}
                                                className="bg-royal-red text-white hover:bg-royal-red/90"
                                            >
                                                {processing ? 'Envoi...' : 'Envoyer la réponse'}
                                            </Button>
                                        </form>
                                    </>
                                ) : (
                                    <p className="text-center text-zinc-500 py-12">Sélectionnez un message pour commencer.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}


