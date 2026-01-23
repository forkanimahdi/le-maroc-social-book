import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Users, Send } from 'lucide-react';
import { useState, useMemo } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Communication', href: '/admin/communication' },
];

export default function Communication() {
    const { participants, flash } = usePage().props;
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [search, setSearch] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        content: '',
        participant_ids: [],
    });

    // Filter participants by search
    const filteredParticipants = useMemo(() => {
        if (!search) return participants;
        const searchLower = search.toLowerCase();
        return participants.filter(p => 
            p.full_name?.toLowerCase().includes(searchLower) ||
            p.email?.toLowerCase().includes(searchLower) ||
            p.role?.toLowerCase().includes(searchLower)
        );
    }, [participants, search]);

    const handleSelectAll = () => {
        // Check if all filtered participants are currently selected
        const allFilteredSelected = filteredParticipants.every(p => selectedParticipants.includes(p.id));
        
        if (allFilteredSelected) {
            // Deselect all filtered participants
            const filteredIds = filteredParticipants.map(p => p.id);
            setSelectedParticipants(selectedParticipants.filter(id => !filteredIds.includes(id)));
            setSelectAll(false);
        } else {
            // Select all filtered participants
            const filteredIds = filteredParticipants.map(p => p.id);
            const newSelection = [...new Set([...selectedParticipants, ...filteredIds])];
            setSelectedParticipants(newSelection);
            
            // Only set selectAll to true if ALL participants (not just filtered) are selected
            if (newSelection.length === participants.length && participants.length > 0) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        }
    };

    const handleToggleParticipant = (participantId) => {
        if (selectedParticipants.includes(participantId)) {
            const newSelection = selectedParticipants.filter(id => id !== participantId);
            setSelectedParticipants(newSelection);
            setSelectAll(false);
        } else {
            const newSelection = [...selectedParticipants, participantId];
            setSelectedParticipants(newSelection);
            // Only set selectAll if ALL participants (not just filtered) are selected
            if (newSelection.length === participants.length && participants.length > 0) {
                setSelectAll(true);
            } else {
                setSelectAll(false);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (selectedParticipants.length === 0) {
            alert('Veuillez sélectionner au moins un participant.');
            return;
        }

        if (!data.subject || !data.content) {
            alert('Veuillez remplir le sujet et le contenu de l\'email.');
            return;
        }

        // Only send 'all' if ALL participants are selected (not just filtered ones)
        // Check if the number of selected participants equals the total number of participants
        const allParticipantsSelected = selectedParticipants.length === participants.length && participants.length > 0;
        const participantIds = allParticipantsSelected ? ['all'] : selectedParticipants;

        setData('participant_ids', participantIds);
        
        post('/admin/communication/send', {
            onSuccess: () => {
                setData({
                    subject: '',
                    content: '',
                    participant_ids: [],
                });
                setSelectedParticipants([]);
                setSelectAll(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Communication - Participants" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                    Communication
                                </h1>
                                <p className="text-zinc-600 mt-2">Envoyez des emails aux participants de l'événement</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-6 h-6" style={{ color: 'var(--royal-red)' }} />
                            </div>
                        </div>
                        {flash?.success && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-green-800">{flash.success}</p>
                            </div>
                        )}
                        {flash?.error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800">{flash.error}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Email Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Composer l'email</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <Label htmlFor="subject">Sujet de l'email *</Label>
                                        <Input
                                            id="subject"
                                            value={data.subject}
                                            onChange={(e) => setData('subject', e.target.value)}
                                            placeholder="Ex: Informations importantes sur l'événement"
                                            className="mt-1"
                                            required
                                        />
                                        {errors.subject && (
                                            <p className="text-sm text-red-600 mt-1">{errors.subject}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="content">Contenu de l'email *</Label>
                                        <Textarea
                                            id="content"
                                            value={data.content}
                                            onChange={(e) => setData('content', e.target.value)}
                                            placeholder="Tapez votre message ici..."
                                            className="mt-1 min-h-[200px]"
                                            required
                                        />
                                        {errors.content && (
                                            <p className="text-sm text-red-600 mt-1">{errors.content}</p>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-zinc-600">
                                                {selectedParticipants.length} participant(s) sélectionné(s)
                                            </span>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleSelectAll}
                                            >
                                                {filteredParticipants.every(p => selectedParticipants.includes(p.id)) && filteredParticipants.length > 0 ? 'Désélectionner tout' : 'Sélectionner tout'}
                                            </Button>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={processing || selectedParticipants.length === 0}
                                            className="w-full"
                                            style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                        >
                                            <Send className="w-4 h-4 mr-2" />
                                            {processing ? 'Envoi en cours...' : `Envoyer à ${selectedParticipants.length} participant(s)`}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Participants List */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Participants approuvés ({filteredParticipants.length})</span>
                                    <Users className="w-5 h-5" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Search */}
                                <div className="mb-4">
                                    <Input
                                        placeholder="Rechercher un participant..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>

                                {/* Participants List */}
                                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                                    {filteredParticipants.length === 0 ? (
                                        <div className="text-center py-8 text-zinc-500">
                                            <Users className="w-12 h-12 mx-auto mb-2 text-zinc-300" />
                                            <p>Aucun participant trouvé</p>
                                        </div>
                                    ) : (
                                        filteredParticipants.map((participant) => (
                                            <div
                                                key={participant.id}
                                                className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
                                            >
                                                <Checkbox
                                                    checked={selectedParticipants.includes(participant.id)}
                                                    onCheckedChange={() => handleToggleParticipant(participant.id)}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-zinc-900 truncate">
                                                        {participant.full_name}
                                                    </div>
                                                    <div className="text-sm text-zinc-600 truncate">
                                                        {participant.email}
                                                    </div>
                                                    {participant.role && (
                                                        <div className="text-xs text-zinc-500">
                                                            {participant.role}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

