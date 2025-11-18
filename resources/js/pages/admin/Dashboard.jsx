import React, { useMemo } from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    Lightbulb, 
    Users, 
    Mail, 
    Calendar, 
    UserCheck, 
    TrendingUp, 
    FileText,
    ArrowRight,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    BarChart3,
    Activity
} from 'lucide-react';

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin' },
];

export default function AdminDashboard() {
    const { stats } = usePage().props;
    
    // Calculate percentages and trends
    const thinkTankApprovalRate = stats?.think_tank_total > 0 
        ? Math.round((stats.think_tank_approved / stats.think_tank_total) * 100) 
        : 0;
    
    const eventApprovalRate = stats?.event_participants_total > 0 
        ? Math.round((stats.event_participants_approved / stats.event_participants_total) * 100) 
        : 0;
    
    const subscriberActiveRate = stats?.subscribers > 0 
        ? Math.round((stats.subscribers_active / stats.subscribers) * 100) 
        : 0;
    
    const statCards = [
        {
            title: 'Idées',
            value: stats?.ideas || 0,
            pending: stats?.ideas_pending || 0,
            icon: Lightbulb,
            href: '/admin/ideas',
            color: 'var(--royal-red)',
            bgColor: 'rgba(134, 2, 5, 0.1)',
            borderColor: 'rgba(134, 2, 5, 0.3)',
        },
        {
            title: 'Think Tank',
            value: stats?.think_tank_total || 0,
            pending: stats?.think_tank_pending || 0,
            approved: stats?.think_tank_approved || 0,
            approvalRate: thinkTankApprovalRate,
            icon: UserCheck,
            href: '/admin/think-tank',
            color: 'var(--royal-green)',
            bgColor: 'rgba(27, 78, 11, 0.1)',
            borderColor: 'rgba(27, 78, 11, 0.3)',
        },
        {
            title: 'Participants',
            value: stats?.event_participants_total || 0,
            pending: stats?.event_participants_pending || 0,
            approved: stats?.event_participants_approved || 0,
            approvalRate: eventApprovalRate,
            icon: Calendar,
            href: '/admin/event-participants',
            color: 'var(--gold)',
            bgColor: 'rgba(204, 185, 116, 0.1)',
            borderColor: 'rgba(204, 185, 116, 0.3)',
        },
        {
            title: 'Newsletter',
            value: stats?.subscribers || 0,
            active: stats?.subscribers_active || 0,
            activeRate: subscriberActiveRate,
            icon: Mail,
            href: '/admin/newsletter',
            color: 'var(--royal-green)',
            bgColor: 'rgba(27, 78, 11, 0.1)',
            borderColor: 'rgba(27, 78, 11, 0.3)',
        },
    ];

    const quickActions = [
        {
            title: 'Gérer les idées',
            description: 'Approuver ou rejeter les idées soumises',
            href: '/admin/ideas',
            icon: Lightbulb,
            color: 'var(--royal-red)',
            count: stats?.ideas_pending || 0,
        },
        {
            title: 'Think Tank',
            description: 'Gérer les inscriptions aux groupes de travail',
            href: '/admin/think-tank',
            icon: UserCheck,
            color: 'var(--royal-green)',
            count: stats?.think_tank_pending || 0,
        },
        {
            title: 'Participants',
            description: 'Gérer les inscriptions à l\'événement',
            href: '/admin/event-participants',
            icon: Calendar,
            color: 'var(--gold)',
            count: stats?.event_participants_pending || 0,
        },
        {
            title: 'Newsletter',
            description: 'Envoyer des newsletters aux abonnés',
            href: '/admin/newsletter',
            icon: Mail,
            color: 'var(--royal-green)',
            count: stats?.subscribers_active || 0,
        },
    ];

    const pendingItems = useMemo(() => {
        const items = [];
        if (stats?.ideas_pending > 0) {
            items.push({
                title: 'Idées en attente',
                count: stats.ideas_pending,
                href: '/admin/ideas',
                icon: Lightbulb,
                color: 'var(--royal-red)',
            });
        }
        if (stats?.think_tank_pending > 0) {
            items.push({
                title: 'Think Tank en attente',
                count: stats.think_tank_pending,
                href: '/admin/think-tank',
                icon: UserCheck,
                color: 'var(--royal-green)',
            });
        }
        if (stats?.event_participants_pending > 0) {
            items.push({
                title: 'Participants en attente',
                count: stats.event_participants_pending,
                href: '/admin/event-participants',
                icon: Calendar,
                color: 'var(--gold)',
            });
        }
        return items;
    }, [stats]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tableau de bord" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border-2 p-6 shadow-sm" style={{ borderColor: 'var(--royal-red)' }}>
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--royal-red)' }}>
                                    Tableau de bord
                                </h1>
                                <p className="text-zinc-600">Vue d'ensemble de votre plateforme</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-zinc-400" />
                                <span className="text-sm text-zinc-500 font-medium">
                                    {new Date().toLocaleDateString('fr-FR', { 
                                        weekday: 'long', 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Pending Items Alert */}
                    {pendingItems.length > 0 && (
                        <div className="bg-white rounded-lg border-2 p-6 shadow-sm" style={{ borderColor: 'var(--royal-red)' }}>
                            <div className="flex items-center gap-3 mb-4">
                                <AlertCircle className="w-6 h-6" style={{ color: 'var(--royal-red)' }} />
                                <h2 className="text-xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                    Actions requises
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {pendingItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link key={index} href={item.href}>
                                            <div 
                                                className="p-4 rounded-lg border-2 hover:shadow-md transition-all cursor-pointer"
                                                style={{ 
                                                    borderColor: item.color,
                                                    backgroundColor: item.color.replace('var(--', 'rgba(').replace(')', ', 0.05)')
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div 
                                                            className="p-2 rounded-lg"
                                                            style={{ backgroundColor: item.color.replace('var(--', 'rgba(').replace(')', ', 0.1)') }}
                                                        >
                                                            <Icon className="w-5 h-5" style={{ color: item.color }} />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-zinc-800">{item.title}</p>
                                                            <p className="text-sm text-zinc-600">{item.count} en attente</p>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-zinc-400" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {statCards.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <Link key={index} href={stat.href}>
                                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:scale-105" style={{ borderColor: stat.borderColor }}>
                                        <CardHeader className="pb-3">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-sm font-medium text-zinc-600 uppercase tracking-wide">
                                                    {stat.title}
                                                </CardTitle>
                                                <div 
                                                    className="p-2.5 rounded-lg"
                                                    style={{ backgroundColor: stat.bgColor }}
                                                >
                                                    <Icon className="w-5 h-5" style={{ color: stat.color }} />
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-4xl font-bold" style={{ color: stat.color }}>
                                                        {stat.value}
                                                    </span>
                                                    <span className="text-sm text-zinc-500">total</span>
                                                </div>
                                                {stat.pending !== undefined && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <AlertCircle className="w-4 h-4" style={{ color: 'var(--royal-red)' }} />
                                                        <span className="text-zinc-600">
                                                            <span className="font-semibold" style={{ color: 'var(--royal-red)' }}>
                                                                {stat.pending}
                                                            </span> en attente
                                                        </span>
                                                    </div>
                                                )}
                                                {stat.approved !== undefined && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <CheckCircle className="w-4 h-4" style={{ color: 'var(--royal-green)' }} />
                                                        <span className="text-zinc-600">
                                                            <span className="font-semibold" style={{ color: 'var(--royal-green)' }}>
                                                                {stat.approved}
                                                            </span> approuvés
                                                        </span>
                                                    </div>
                                                )}
                                                {stat.active !== undefined && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Activity className="w-4 h-4" style={{ color: 'var(--royal-green)' }} />
                                                        <span className="text-zinc-600">
                                                            <span className="font-semibold" style={{ color: 'var(--royal-green)' }}>
                                                                {stat.active}
                                                            </span> actifs
                                                        </span>
                                                    </div>
                                                )}
                                                {(stat.approvalRate !== undefined || stat.activeRate !== undefined) && (
                                                    <div className="pt-2">
                                                        <div className="flex items-center justify-between text-xs mb-1">
                                                            <span className="text-zinc-500">Taux</span>
                                                            <span className="font-semibold" style={{ color: stat.color }}>
                                                                {stat.approvalRate || stat.activeRate}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full h-2 rounded-full" style={{ backgroundColor: stat.bgColor }}>
                                                            <div 
                                                                className="h-2 rounded-full transition-all duration-500"
                                                                style={{ 
                                                                    width: `${stat.approvalRate || stat.activeRate}%`,
                                                                    backgroundColor: stat.color
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg border-2 p-6 shadow-sm" style={{ borderColor: 'var(--royal-green)' }}>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--royal-green)' }}>
                            Actions rapides
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action, index) => {
                                const Icon = action.icon;
                                return (
                                    <Link key={index} href={action.href}>
                                        <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:scale-105 group" style={{ borderColor: action.color }}>
                                            <CardHeader>
                                                <div className="flex items-center justify-between mb-3">
                                                    <div 
                                                        className="p-3 rounded-lg"
                                                        style={{ backgroundColor: action.color.replace('var(--', 'rgba(').replace(')', ', 0.1)') }}
                                                    >
                                                        <Icon className="w-6 h-6" style={{ color: action.color }} />
                                                    </div>
                                                    {action.count > 0 && (
                                                        <div 
                                                            className="px-2 py-1 rounded-full text-xs font-bold text-white"
                                                            style={{ backgroundColor: action.color }}
                                                        >
                                                            {action.count}
                                                        </div>
                                                    )}
                                                </div>
                                                <CardTitle className="text-lg font-semibold mb-2" style={{ color: action.color }}>
                                                    {action.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-zinc-600 mb-3">{action.description}</p>
                                                <div className="flex items-center gap-2 text-sm font-medium group-hover:translate-x-1 transition-transform" style={{ color: action.color }}>
                                                    <span>Accéder</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Statistics Summary */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="border-2" style={{ borderColor: 'var(--royal-red)' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2" style={{ color: 'var(--royal-red)' }}>
                                    <BarChart3 className="w-5 h-5" />
                                    Statistiques globales
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: 'rgba(134, 2, 5, 0.2)', backgroundColor: 'rgba(134, 2, 5, 0.05)' }}>
                                        <div className="flex items-center gap-3">
                                            <Lightbulb className="w-5 h-5" style={{ color: 'var(--royal-red)' }} />
                                            <span className="text-zinc-700 font-medium">Total idées</span>
                                        </div>
                                        <span className="text-2xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                            {stats?.ideas || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: 'rgba(27, 78, 11, 0.2)', backgroundColor: 'rgba(27, 78, 11, 0.05)' }}>
                                        <div className="flex items-center gap-3">
                                            <UserCheck className="w-5 h-5" style={{ color: 'var(--royal-green)' }} />
                                            <span className="text-zinc-700 font-medium">Inscriptions Think Tank</span>
                                        </div>
                                        <span className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
                                            {stats?.think_tank_total || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: 'rgba(204, 185, 116, 0.2)', backgroundColor: 'rgba(204, 185, 116, 0.05)' }}>
                                        <div className="flex items-center gap-3">
                                            <Calendar className="w-5 h-5" style={{ color: 'var(--gold)' }} />
                                            <span className="text-zinc-700 font-medium">Participants événement</span>
                                        </div>
                                        <span className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>
                                            {stats?.event_participants_total || 0}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border-2" style={{ borderColor: 'rgba(27, 78, 11, 0.2)', backgroundColor: 'rgba(27, 78, 11, 0.05)' }}>
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5" style={{ color: 'var(--royal-green)' }} />
                                            <span className="text-zinc-700 font-medium">Abonnés newsletter</span>
                                        </div>
                                        <span className="text-2xl font-bold" style={{ color: 'var(--royal-green)' }}>
                                            {stats?.subscribers || 0}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-2" style={{ borderColor: 'var(--royal-green)' }}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2" style={{ color: 'var(--royal-green)' }}>
                                    <Activity className="w-5 h-5" />
                                    Activité récente
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-lg border-2" style={{ borderColor: 'rgba(134, 2, 5, 0.2)', backgroundColor: 'rgba(134, 2, 5, 0.05)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <Lightbulb className="w-5 h-5" style={{ color: 'var(--royal-red)' }} />
                                                <span className="text-zinc-700 font-medium">Idées en attente</span>
                                            </div>
                                            <span className="text-xl font-bold" style={{ color: 'var(--royal-red)' }}>
                                                {stats?.ideas_pending || 0}
                                            </span>
                                        </div>
                                        <Link href="/admin/ideas" className="text-sm font-medium" style={{ color: 'var(--royal-red)' }}>
                                            Voir toutes les idées →
                                        </Link>
                                    </div>
                                    <div className="p-4 rounded-lg border-2" style={{ borderColor: 'rgba(27, 78, 11, 0.2)', backgroundColor: 'rgba(27, 78, 11, 0.05)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <UserCheck className="w-5 h-5" style={{ color: 'var(--royal-green)' }} />
                                                <span className="text-zinc-700 font-medium">Think Tank en attente</span>
                                            </div>
                                            <span className="text-xl font-bold" style={{ color: 'var(--royal-green)' }}>
                                                {stats?.think_tank_pending || 0}
                                            </span>
                                        </div>
                                        <Link href="/admin/think-tank" className="text-sm font-medium" style={{ color: 'var(--royal-green)' }}>
                                            Gérer les inscriptions →
                                        </Link>
                                    </div>
                                    <div className="p-4 rounded-lg border-2" style={{ borderColor: 'rgba(204, 185, 116, 0.2)', backgroundColor: 'rgba(204, 185, 116, 0.05)' }}>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="w-5 h-5" style={{ color: 'var(--gold)' }} />
                                                <span className="text-zinc-700 font-medium">Participants en attente</span>
                                            </div>
                                            <span className="text-xl font-bold" style={{ color: 'var(--gold)' }}>
                                                {stats?.event_participants_pending || 0}
                                            </span>
                                        </div>
                                        <Link href="/admin/event-participants" className="text-sm font-medium" style={{ color: 'var(--gold)' }}>
                                            Gérer les participants →
                                        </Link>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
