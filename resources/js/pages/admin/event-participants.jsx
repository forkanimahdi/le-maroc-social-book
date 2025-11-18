import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock, Search, Filter, Users } from 'lucide-react';
import { useState, useMemo } from 'react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Participants', href: '/admin/event-participants' },
];

export default function AdminEventParticipants() {
    const { participants, stats } = usePage().props;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Frontend-only filtering
    const filteredParticipants = useMemo(() => {
        let filtered = [...participants];

        // Search filter
        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(participant => 
                participant.full_name?.toLowerCase().includes(searchLower) ||
                participant.email?.toLowerCase().includes(searchLower) ||
                participant.role?.toLowerCase().includes(searchLower) ||
                participant.phone?.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (statusFilter) {
            filtered = filtered.filter(participant => participant.status === statusFilter);
        }

        return filtered;
    }, [participants, search, statusFilter]);

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

    const handleApprove = (id) => {
        router.post(`/admin/event-participants/${id}/approve`, {}, {
            onSuccess: () => {
                // Page will refresh automatically
            },
            onError: (errors) => {
                console.error('Error approving participant:', errors);
            }
        });
    };

    const handleReject = (id) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter ce participant ?')) {
            router.post(`/admin/event-participants/${id}/reject`, {}, {
                onSuccess: () => {
                    // Page will refresh automatically
                },
                onError: (errors) => {
                    console.error('Error rejecting participant:', errors);
                }
            });
        }
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
            <Head title="Participants à l'événement" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header with Stats */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                    Participants à l'événement
                                </h1>
                                <p className="text-zinc-600 mt-2">Gérez les inscriptions à l'événement de lancement</p>
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-1">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                        <Input
                                            placeholder="Rechercher par nom, email, rôle..."
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
                            </div>
                        </CardContent>
                    </Card>

                    {/* Participants Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Participants ({filteredParticipants.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {filteredParticipants.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
                                    <p className="text-zinc-600">Aucun participant trouvé.</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Nom</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Rôle</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Email</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Téléphone</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Statut</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Date</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredParticipants.map((participant) => (
                                                <tr key={participant.id} className="border-b hover:bg-zinc-50">
                                                    <td className="p-3 text-sm">{participant.full_name}</td>
                                                    <td className="p-3 text-sm">{participant.role}</td>
                                                    <td className="p-3 text-sm">{participant.email}</td>
                                                    <td className="p-3 text-sm">{participant.phone}</td>
                                                    <td className="p-3">
                                                        {getStatusBadge(participant.status)}
                                                    </td>
                                                    <td className="p-3 text-sm text-zinc-600">
                                                        {formatDate(participant.created_at)}
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            {participant.status === 'pending' && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handleApprove(participant.id)}
                                                                        style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                                                    >
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        Approuver
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handleReject(participant.id)}
                                                                        style={{ backgroundColor: 'var(--royal-red)', color: 'white' }}
                                                                    >
                                                                        <XCircle className="w-4 h-4 mr-1" />
                                                                        Rejeter
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {participant.status === 'approved' && (
                                                                <span className="text-xs" style={{ color: 'var(--royal-green)' }}>
                                                                    Approuvé le {formatDate(participant.approved_at)}
                                                                </span>
                                                            )}
                                                            {participant.status === 'rejected' && (
                                                                <span className="text-xs" style={{ color: 'var(--royal-red)' }}>
                                                                    Rejeté le {formatDate(participant.rejected_at)}
                                                                </span>
                                                            )}
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
        </AppLayout>
    );
}
