import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, Clock, Search, Filter, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    const { signups, filters, stats } = usePage().props;
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [groupFilter, setGroupFilter] = useState(filters?.group || '');

    // Real-time search with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get('/admin/think-tank', {
                search,
                status: statusFilter,
                group: groupFilter,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 300); // 300ms debounce

        return () => clearTimeout(timeoutId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, statusFilter, groupFilter]);

    const handleFilterChange = (type, value) => {
        const filterValue = value === 'all' ? '' : value;
        if (type === 'status') {
            setStatusFilter(filterValue);
            router.get('/admin/think-tank', {
                search,
                status: filterValue,
                group: groupFilter,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        } else if (type === 'group') {
            setGroupFilter(filterValue);
            router.get('/admin/think-tank', {
                search,
                status: statusFilter,
                group: filterValue,
            }, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

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
        router.post(`/admin/think-tank/${id}/approve`, {}, {
            onSuccess: () => {
                // Page will refresh automatically
            },
            onError: (errors) => {
                console.error('Error approving signup:', errors);
                alert('Erreur lors de l\'approbation.');
            }
        });
    };

    const handleReject = (id) => {
        if (confirm('Êtes-vous sûr de vouloir rejeter cette inscription ?')) {
            router.post(`/admin/think-tank/${id}/reject`, {}, {
                onSuccess: () => {
                    // Page will refresh automatically
                },
                onError: (errors) => {
                    console.error('Error rejecting signup:', errors);
                    alert('Erreur lors du rejet.');
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
            <Head title="Think Tank - Inscriptions" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header with Stats */}
                    <div className="bg-white rounded-lg border border-royal-green-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold" style={{ color: 'var(--royal-green)' }}>
                                    Think Tank - Inscriptions
                                </h1>
                                <p className="text-zinc-600 mt-2">Gérez les inscriptions au Think Tank</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-6 h-6" style={{ color: 'var(--royal-green)' }} />
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="text-sm text-zinc-600 mb-1">Total</div>
                                    <div className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
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
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                                <Select value={statusFilter || undefined} onValueChange={(value) => handleFilterChange('status', value || '')}>
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
                                <Select value={groupFilter || undefined} onValueChange={(value) => handleFilterChange('group', value || '')}>
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

                    {/* Registrations Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Inscriptions ({signups?.total || 0})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {signups?.data && signups.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Nom</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Email</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Groupe</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Domaines</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Statut</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Date</th>
                                                <th className="text-left p-3 text-sm font-semibold text-zinc-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {signups.data.map((signup) => (
                                                <tr key={signup.id} className="border-b hover:bg-zinc-50">
                                                    <td className="p-3 text-sm">{signup.nom}</td>
                                                    <td className="p-3 text-sm">{signup.email}</td>
                                                    <td className="p-3 text-sm">
                                                        <span className="text-xs">{GROUP_LABELS[signup.group] || signup.group}</span>
                                                    </td>
                                                    <td className="p-3 text-sm">
                                                        {signup.domain_expertise ? (
                                                            <span className="text-xs text-zinc-600">{signup.domain_expertise}</span>
                                                        ) : (
                                                            <span className="text-zinc-400">-</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3">
                                                        {getStatusBadge(signup.status)}
                                                    </td>
                                                    <td className="p-3 text-sm text-zinc-600">
                                                        {formatDate(signup.created_at)}
                                                    </td>
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2">
                                                            {signup.status === 'pending' && (
                                                                <>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handleApprove(signup.id)}
                                                                        style={{ backgroundColor: 'var(--royal-green)', color: 'white' }}
                                                                    >
                                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                                        Approuver
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handleReject(signup.id)}
                                                                        style={{ backgroundColor: 'var(--royal-red)', color: 'white' }}
                                                                    >
                                                                        <XCircle className="w-4 h-4 mr-1" />
                                                                        Rejeter
                                                                    </Button>
                                                                </>
                                                            )}
                                                            {signup.status === 'approved' && (
                                                                <span className="text-xs" style={{ color: 'var(--royal-green)' }}>
                                                                    Approuvé le {formatDate(signup.approved_at)}
                                                                </span>
                                                            )}
                                                            {signup.status === 'rejected' && (
                                                                <span className="text-xs" style={{ color: 'var(--royal-red)' }}>
                                                                    Rejeté le {formatDate(signup.rejected_at)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Pagination */}
                                    {signups.links && signups.links.length > 3 && (
                                        <div className="mt-6 flex items-center justify-center gap-2">
                                            {signups.links.map((link, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => link.url && router.get(link.url)}
                                                    disabled={!link.url}
                                                    className={`px-3 py-2 rounded-lg text-sm ${
                                                        link.active
                                                            ? 'bg-royal-green text-white'
                                                            : link.url
                                                            ? 'bg-white border border-royal-green-soft text-royal-green hover:bg-royal-green-soft'
                                                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Users className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
                                    <p className="text-zinc-600">Aucune inscription trouvée.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

