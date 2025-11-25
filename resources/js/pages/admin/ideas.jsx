import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Clock, Eye, Edit2, Save, X, Trash2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Idées', href: '/admin/ideas' },
];

export default function AdminIdeas() {
    const { ideas } = usePage().props;
    const [editingId, setEditingId] = useState(null);
    const { data: editData, setData: setEditData, put, processing: updating, reset: resetEdit } = useForm({
        full_name: '',
        role: '',
        email: '',
        text: '',
    });
    const { delete: destroyIdea, processing: deleting } = useForm({});

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { 
                label: 'En attente', 
                icon: Clock,
                style: { backgroundColor: 'rgba(204, 185, 116, 0.2)', color: 'var(--gold)', borderColor: 'var(--gold)' } 
            },
            approved: { 
                label: 'Approuvée', 
                icon: CheckCircle,
                style: { backgroundColor: 'rgba(27, 78, 11, 0.2)', color: 'var(--royal-green)', borderColor: 'var(--royal-green)' } 
            },
            rejected: { 
                label: 'Rejetée', 
                icon: XCircle,
                style: { backgroundColor: 'rgba(134, 2, 5, 0.2)', color: 'var(--royal-red)', borderColor: 'var(--royal-red)' } 
            }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge className="border" style={config.style}>
                <Icon className="w-3 h-3 mr-1" />
                {config.label}
            </Badge>
        );
    };

    const handleApprove = (ideaId) => {
        router.post(`/admin/ideas/${ideaId}/approve`, {}, {
            onSuccess: () => {
                // The page will refresh automatically due to Inertia
            },
            onError: (errors) => {
                console.error('Error approving idea:', errors);
                alert('Erreur lors de l\'approbation de l\'idée.');
            }
        });
    };

    const handleReject = (ideaId) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette idée ?')) {
            router.post(`/admin/ideas/${ideaId}/reject`, {}, {
                onSuccess: () => {
                    // The page will refresh automatically due to Inertia
                },
                onError: (errors) => {
                    console.error('Error rejecting idea:', errors);
                    alert('Erreur lors du rejet de l\'idée.');
                }
            });
        }
    };

    const handleEdit = (idea) => {
        setEditingId(idea.id);
        setEditData('full_name', idea.full_name || '');
        setEditData('role', idea.role || '');
        setEditData('email', idea.email || '');
        setEditData('text', idea.text || '');
    };

    const handleSave = (ideaId) => {
        put(`/ideas/${ideaId}`, {
            onSuccess: () => {
                setEditingId(null);
                resetEdit();
            },
            onError: (errors) => {
                console.error('Error updating idea:', errors);
            }
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        resetEdit();
    };

    const handleDelete = (ideaId) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer définitivement cette idée ?')) {
            return;
        }

        destroyIdea(`/admin/ideas/${ideaId}`, {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Error deleting idea:', errors);
                alert('Erreur lors de la suppression de l\'idée.');
            },
            onSuccess: () => {
                if (editingId === ideaId) {
                    handleCancel();
                }
            }
        });
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const pendingIdeas = ideas.filter(idea => idea.status === 'pending');
    const approvedIdeas = ideas.filter(idea => idea.status === 'approved');
    const rejectedIdeas = ideas.filter(idea => idea.status === 'rejected');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Idées" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">
                                    Gestion des Idées
                                </h1>
                                <p className="text-zinc-600 mt-1">
                                    Gérez les idées soumises par les utilisateurs
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>{pendingIdeas.length}</div>
                                    <div className="text-sm text-zinc-600">En attente</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>{approvedIdeas.length}</div>
                                    <div className="text-sm text-zinc-600">Approuvées</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-red)' }}>{rejectedIdeas.length}</div>
                                    <div className="text-sm text-zinc-600">Rejetées</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ideas List */}
                    <div className="space-y-6">
                        {ideas.length === 0 ? (
                            <Card>
                                <CardContent className="p-8 text-center">
                                    <Eye className="w-12 h-12 mx-auto text-zinc-400 mb-4" />
                                    <h3 className="text-lg font-semibold text-zinc-600 mb-2">
                                        Aucune idée soumise
                                    </h3>
                                    <p className="text-zinc-500">
                                        Les idées soumises par les utilisateurs apparaîtront ici.
                                    </p>
                                </CardContent>
                            </Card>
                        ) : (
                            ideas.map((idea) => (
                                <Card key={idea.id} className="border border-zinc-200">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {getStatusBadge(idea.status)}
                                                    <span className="text-sm text-zinc-500">
                                                        {formatDate(idea.created_at)}
                                                    </span>
                                                </div>
                                                {editingId === idea.id ? (
                                                    <div className="space-y-3">
                                                        <Input
                                                            value={editData.full_name}
                                                            onChange={(e) => setEditData('full_name', e.target.value)}
                                                            placeholder="Nom complet"
                                                            className="w-full"
                                                        />
                                                        <Input
                                                            value={editData.role}
                                                            onChange={(e) => setEditData('role', e.target.value)}
                                                            placeholder="Rôle / Profession"
                                                            className="w-full"
                                                        />
                                                        <Input
                                                            type="email"
                                                            value={editData.email}
                                                            onChange={(e) => setEditData('email', e.target.value)}
                                                            placeholder="Email"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                ) : (
                                                    <CardTitle className="text-lg text-zinc-800">
                                                        {idea.full_name || 'Anonyme'} {idea.role && `- ${idea.role}`}
                                                    </CardTitle>
                                                )}
                                            </div>
                                            <div className="flex gap-2  justify-end">
                                                {editingId === idea.id ? (
                                                    <>
                                                        <Button
                                                            onClick={() => handleSave(idea.id)}
                                                            size="sm"
                                                            style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                                        >
                                                            <Save className="w-4 h-4 mr-1" />
                                                            Enregistrer
                                                        </Button>
                                                        <Button
                                                            onClick={handleCancel}
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            <X className="w-4 h-4 mr-1" />
                                                            Annuler
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            onClick={() => handleEdit(idea)}
                                                            size="sm"
                                                            variant="outline"
                                                            style={{ borderColor: 'var(--royal-green)', color: 'var(--royal-green)' }}
                                                        >
                                                            <Edit2 className="w-4 h-4 mr-1" />
                                                            Modifier
                                                        </Button>
                                                        {idea.status === 'pending' && (
                                                            <>
                                                                <Button
                                                                    onClick={() => handleApprove(idea.id)}
                                                                    size="icon"
                                                                    className="text-white"
                                                                    style={{ backgroundColor: 'var(--royal-green)' }}
                                                                    title="Approuver"
                                                                    aria-label="Approuver"
                                                                >
                                                                    <CheckCircle className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    onClick={() => handleReject(idea.id)}
                                                                    size="icon"
                                                                    className="text-white"
                                                                    style={{ backgroundColor: 'var(--royal-red)' }}
                                                                    title="Rejeter"
                                                                    aria-label="Rejeter"
                                                                >
                                                                    <XCircle className="w-4 h-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                                <Button
                                                    onClick={() => handleDelete(idea.id)}
                                                    size="icon"
                                                    variant="outline"
                                                    disabled={deleting}
                                                    style={{ borderColor: 'var(--royal-red)', color: 'var(--royal-red)' }}
                                                    title="Supprimer"
                                                    aria-label="Supprimer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-zinc-700 mb-2">Contenu de l'idée :</h4>
                                                {editingId === idea.id ? (
                                                    <Textarea
                                                        value={editData.text}
                                                        onChange={(e) => setEditData('text', e.target.value)}
                                                        rows={5}
                                                        className="w-full"
                                                    />
                                                ) : (
                                                    <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                                                        {idea.text}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-zinc-600">Acceptation des conditions :</span>
                                                <Badge variant={idea.agree ? "default" : "destructive"}>
                                                    {idea.agree ? 'Oui' : 'Non'}
                                                </Badge>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
