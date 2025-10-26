import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, Eye } from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
    { title: 'Idées', href: '/admin/ideas' },
];

export default function AdminIdeas() {
    const { ideas } = usePage().props;

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { 
                label: 'En attente', 
                variant: 'secondary', 
                icon: Clock,
                color: 'text-yellow-600 bg-yellow-100' 
            },
            approved: { 
                label: 'Approuvée', 
                variant: 'default', 
                icon: CheckCircle,
                color: 'text-green-600 bg-green-100' 
            },
            rejected: { 
                label: 'Rejetée', 
                variant: 'destructive', 
                icon: XCircle,
                color: 'text-red-600 bg-red-100' 
            }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <Badge className={`${config.color} border-0`}>
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
                                    <div className="text-2xl font-bold text-yellow-600">{pendingIdeas.length}</div>
                                    <div className="text-sm text-zinc-600">En attente</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{approvedIdeas.length}</div>
                                    <div className="text-sm text-zinc-600">Approuvées</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{rejectedIdeas.length}</div>
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
                                                <CardTitle className="text-lg text-zinc-800">
                                                    Idée #{idea.id}
                                                </CardTitle>
                                            </div>
                                            {idea.status === 'pending' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        onClick={() => handleApprove(idea.id)}
                                                        size="sm"
                                                        className="bg-green-600 hover:bg-green-700 text-white"
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Approuver
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleReject(idea.id)}
                                                        size="sm"
                                                        variant="outline"
                                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                                    >
                                                        <XCircle className="w-4 h-4 mr-1" />
                                                        Rejeter
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="font-semibold text-zinc-700 mb-2">Contenu de l'idée :</h4>
                                                <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap">
                                                    {idea.text}
                                                </p>
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
