import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock, Search, Filter, Users, Trash2, Eye, ExternalLink, FileText } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Think Tank', href: '/admin/think-tank' },
];

const GROUP_LABELS = {
    jeunesse: 'Jeunesse, Éducation et Emploi',
    femmes: 'Femmes, Travail Invisible et Sécurité Sociale',
    vieillissement: 'Vieillissement, Santé et Transitions Démographiques',
    pacte: 'Pacte National, Territoires et Engagement Citoyen',
};

export default function AdminThinkTank() {
    const { signups, stats } = usePage().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [groupFilter, setGroupFilter] = useState('');
    const [selectedSignup, setSelectedSignup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { delete: destroySignup, processing: deleting } = useForm({});

    // Frontend-only filtering
    const filteredSignups = useMemo(() => {
        let filtered = [...signups];

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(signup => 
                signup.nom?.toLowerCase().includes(searchLower) ||
                signup.email?.toLowerCase().includes(searchLower) ||
                signup.group?.toLowerCase().includes(searchLower) ||
                signup.domain_expertise?.toLowerCase().includes(searchLower) ||
                signup.presentation?.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (statusFilter) {
            filtered = filtered.filter(signup => signup.status === statusFilter);
        }

        // Group filter
        if (groupFilter) {
            filtered = filtered.filter(signup => signup.group === groupFilter);
        }

        return filtered;
    }, [signups, search, statusFilter, groupFilter]);

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { 
                label: 'En attente', 
                icon: Clock,
                style: { backgroundColor: 'rgba(204, 185, 116, 0.2)', color: 'var(--gold)', borderColor: 'var(--gold)' } 
            },
            approved: { 
                label: 'Approuvé', 
                icon: CheckCircle,
                style: { backgroundColor: 'rgba(27, 78, 11, 0.2)', color: 'var(--royal-green)', borderColor: 'var(--royal-green)' } 
            },
            rejected: { 
                label: 'Rejeté', 
                icon: XCircle,
                style: { backgroundColor: 'rgba(134, 2, 5, 0.2)', color: 'var(--royal-red)', borderColor: 'var(--royal-red)' } 
            },
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

    const handleApprove = (id, closeAfter = false) => {
        router.post(`/admin/think-tank/${id}/approve`, {}, {
            onSuccess: () => {
                if (closeAfter) {
                    setIsModalOpen(false);
                    setSelectedSignup(null);
                }
                // Page will refresh automatically
            },
            onError: (errors) => {
                console.error('Error approving signup:', errors);
            }
        });
    };

    const handleReject = (id, closeAfter = false) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette inscription ?')) {
            router.post(`/admin/think-tank/${id}/reject`, {}, {
                onSuccess: () => {
                    if (closeAfter) {
                        setIsModalOpen(false);
                        setSelectedSignup(null);
                    }
                    // Page will refresh automatically
                },
                onError: (errors) => {
                    console.error('Error rejecting signup:', errors);
                }
            });
        }
    };

    const handleDelete = (id) => {
        if (!confirm('Supprimer définitivement cette inscription ?')) {
            return;
        }

        destroySignup(`/admin/think-tank/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                setSelectedSignup(null);
            },
            onError: (errors) => {
                console.error('Error deleting signup:', errors);
                alert('Erreur lors de la suppression de l\'inscription.');
            }
        });
    };

    const openModal = (signup) => {
        setSelectedSignup(signup);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSignup(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Think Tank - Inscriptions" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header with Stats */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                    Inscriptions Think Tank
                                </h1>
                                <p className="text-zinc-600 mt-2">Gérez les inscriptions aux groupes de travail</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-6 h-6" style={{ color: 'var(--royal-red)' }} />
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-zinc-600 mb-1">Total</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                        {stats?.total || 0}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-zinc-600 mb-1">En attente</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>
                                        {stats?.pending || 0}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-zinc-600 mb-1">Approuvés</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
                                        {stats?.approved || 0}
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-zinc-600 mb-1">Rejetés</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                        {stats?.rejected || 0}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Filters */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Filter className="w-5 h-5" />
                                Filtres
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <Input
                                            placeholder="Rechercher par nom, email..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="pl-10"
                                        />
                                    </div>
                                </div>
                                <Select value={statusFilter || undefined} onValueChange={(value) => setStatusFilter(value === 'all' ? '' : value || '')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tous les statuts" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les statuts</SelectItem>
                                        <SelectItem value="pending">En attente</SelectItem>
                                        <SelectItem value="approved">Approuvé</SelectItem>
                                        <SelectItem value="rejected">Rejeté</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={groupFilter || undefined} onValueChange={(value) => setGroupFilter(value === 'all' ? '' : value || '')}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tous les groupes" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tous les groupes</SelectItem>
                                        <SelectItem value="jeunesse">{GROUP_LABELS.jeunesse}</SelectItem>
                                        <SelectItem value="femmes">{GROUP_LABELS.femmes}</SelectItem>
                                        <SelectItem value="vieillissement">{GROUP_LABELS.vieillissement}</SelectItem>
                                        <SelectItem value="pacte">{GROUP_LABELS.pacte}</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Signups Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Inscriptions ({filteredSignups.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {filteredSignups.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
                                    <p className="text-zinc-600">Aucune inscription trouvée.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Nom</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Email</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Groupe</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">LinkedIn</th>
                                                {/* <th className="text-left p-3 text-sm font-semibold text-zinc-700">CV</th> */}
                                                {/* <th className="text-left p-3 text-sm font-semibold text-zinc-700">Présentation</th> */}
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Statut</th>
                                                {/* <th className="text-left p-3 text-sm font-semibold text-zinc-700">Date</th> */}
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredSignups.map((signup) => (
                                                <tr key={signup.id} className="border-b hover:bg-zinc-50">
                                                    <td className="p-3 text-sm">{signup.nom}</td>
                                                    <td className="p-3 text-sm">{signup.email}</td>
                                                    <td className="p-3 text-sm">{GROUP_LABELS[signup.group] || signup.group}</td>
                                                    <td className="p-3 text-sm">
                                                        {signup.linkedin_url ? (
                                                            <a 
                                                                href={signup.linkedin_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                                            >
                                                                <ExternalLink className="w-3 h-3" />
                                                                LinkedIn
                                                            </a>
                                                        ) : (
                                                            <span className="text-zinc-400">-</span>
                                                        )}
                                                    </td>
                                                    {/* <td className="p-3 text-sm">
                                                        {signup.cv_url ? (
                                                            <a 
                                                                href={signup.cv_url} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-blue-600 hover:underline flex items-center gap-1"
                                                            >
                                                                <FileText className="w-3 h-3" />
                                                                Voir CV
                                                            </a>
                                                        ) : (
                                                            <span className="text-zinc-400">-</span>
                                                        )}
                                                    </td> */}
                                                    {/* <td className="p-3 text-sm max-w-xs">
                                                        <div className="truncate" title={signup.presentation || '-'}>
                                                            {signup.presentation || '-'}
                                                        </div>
                                                    </td> */}
                                                    <td className="p-3">
                                                        {getStatusBadge(signup.status)}
                                                    </td>
                                                    {/* <td className="p-3 text-sm text-zinc-600">
                                                        {formatDate(signup.created_at)}
                                                    </td> */}
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                size="icon"
                                                                variant="outline"
                                                                onClick={() => openModal(signup)}
                                                                style={{ borderColor: 'var(--royal-green)', color: 'var(--royal-green)' }}
                                                                title="Voir les détails"
                                                                aria-label="Voir les détails"
                                                            >
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Preview Modal */}
            <Dialog open={isModalOpen} onOpenChange={closeModal}>
                <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-white">
                    <DialogHeader className="pb-4 border-b">
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                    Détails de l'inscription
                                </DialogTitle>
                                <DialogDescription>
                                    Informations complètes de la candidature
                                </DialogDescription>
                            </div>
                            <div className="flex items-center gap-3">
                                {selectedSignup && getStatusBadge(selectedSignup.status)}
                                <span className="text-xs text-zinc-600">
                                    {selectedSignup && formatDate(selectedSignup.created_at)}
                                </span>
                            </div>
                        </div>
                    </DialogHeader>

                    {selectedSignup && (
                        <div className="space-y-4 py-4">
                            {/* Contact & Links Section */}
                            <div className="bg-zinc-50 rounded-lg p-4 space-y-3">
                                <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide mb-3">Contact & Liens</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-zinc-600">Email</span>
                                        <a href={`mailto:${selectedSignup.email}`} className="text-sm text-blue-600 hover:underline">
                                            {selectedSignup.email}
                                        </a>
                                    </div>
                                    {selectedSignup.linkedin_url && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-zinc-600">LinkedIn</span>
                                            <a 
                                                href={selectedSignup.linkedin_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                                Voir le profil
                                            </a>
                                        </div>
                                    )}
                                    {selectedSignup.cv_url && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-zinc-600">CV</span>
                                            <a 
                                                href={selectedSignup.cv_url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                            >
                                                <FileText className="w-3 h-3" />
                                                Télécharger
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Presentation Section */}
                            {selectedSignup.presentation && (
                                <div className="bg-zinc-50 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide mb-2">Présentation</h3>
                                    <p className="text-sm text-zinc-900 leading-relaxed">{selectedSignup.presentation}</p>
                                </div>
                            )}

                            {/* Expertise Section */}
                            {(selectedSignup.domain_expertise || selectedSignup.domaine) && (
                                <div className="bg-zinc-50 rounded-lg p-4 space-y-2">
                                    <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide mb-2">Expertise</h3>
                                    {selectedSignup.domain_expertise && (
                                        <div>
                                            <span className="text-xs text-zinc-600">Domaine d'expertise</span>
                                            <p className="text-sm text-zinc-900 mt-1">{selectedSignup.domain_expertise}</p>
                                        </div>
                                    )}
                                    {selectedSignup.domaine && (
                                        <div>
                                            <span className="text-xs text-zinc-600">Domaine</span>
                                            <p className="text-sm text-zinc-900 mt-1">{selectedSignup.domaine}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Motivation Section */}
                            {selectedSignup.motivation && (
                                <div className="bg-zinc-50 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide mb-2">Motivation</h3>
                                    <p className="text-sm text-zinc-900 leading-relaxed whitespace-pre-wrap">{selectedSignup.motivation}</p>
                                </div>
                            )}

                            {/* Status Info */}
                            {(selectedSignup.status === 'approved' && selectedSignup.approved_at) || 
                             (selectedSignup.status === 'rejected' && selectedSignup.rejected_at) ? (
                                <div className="bg-zinc-50 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide mb-2">Historique</h3>
                                    {selectedSignup.status === 'approved' && selectedSignup.approved_at && (
                                        <div className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4" style={{ color: 'var(--royal-green)' }} />
                                            <span className="text-sm text-zinc-900">
                                                Approuvé le {formatDate(selectedSignup.approved_at)}
                                            </span>
                                        </div>
                                    )}
                                    {selectedSignup.status === 'rejected' && selectedSignup.rejected_at && (
                                        <div className="flex items-center gap-2">
                                            <XCircle className="w-4 h-4" style={{ color: 'var(--royal-red)' }} />
                                            <span className="text-sm text-zinc-900">
                                                Rejeté le {formatDate(selectedSignup.rejected_at)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    )}

                    <DialogFooter className="flex flex-row gap-2 justify-between pt-4 border-t">
                        <div className="flex gap-2">
                            {selectedSignup && selectedSignup.status === 'pending' && (
                                <>
                                    <Button
                                        onClick={() => handleApprove(selectedSignup.id, true)}
                                        className="text-sm px-4 py-2"
                                        style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approuver
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(selectedSignup.id, true)}
                                        variant="outline"
                                        className="text-sm px-4 py-2 bg-royal-red text-white"
                                        // style={{ borderColor: 'var(--royal-red)', color: 'var(--royal-red)' }}
                                    >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Rejeter
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="text-sm px-4 py-2"
                                onClick={() => {
                                    if (confirm('Supprimer définitivement cette inscription ?')) {
                                        handleDelete(selectedSignup?.id);
                                    }
                                }}
                                disabled={deleting}
                                style={{ borderColor: 'var(--royal-red)', color: 'var(--royal-red)' }}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer
                            </Button>
                            <Button
                                variant="outline"
                                className="text-sm px-4 py-2"
                                onClick={closeModal}
                            >
                                Fermer
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
