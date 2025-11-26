import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Activity,
    ArrowRight,
    Bell,
    Calendar,
    CheckCircle,
    Lightbulb,
    Mail,
    MessageSquare,
    TrendingUp,
    Users,
} from 'lucide-react';

const breadcrumbs = [{ title: 'Dashboard', href: '/dashboard' }];

const palette = {
    red: 'var(--royal-red)',
    green: 'var(--royal-green)',
    gold: 'var(--gold)',
};

export default function Dashboard() {
    const { stats = {}, recentActivity = [], notifications = [] } = usePage().props;

    const safeStats = {
        ideas: stats?.ideas || 0,
        ideas_pending: stats?.ideas_pending || 0,
        think_tank_total: stats?.think_tank_total || 0,
        think_tank_pending: stats?.think_tank_pending || 0,
        think_tank_approved: stats?.think_tank_approved || 0,
        event_participants_total: stats?.event_participants_total || 0,
        event_participants_pending: stats?.event_participants_pending || 0,
        event_participants_approved: stats?.event_participants_approved || 0,
        subscribers: stats?.subscribers || 0,
        subscribers_active: stats?.subscribers_active || 0,
        messages_total: stats?.messages_total || 0,
        messages_pending: stats?.messages_pending || 0,
    };

    const highlightCards = [
        {
            title: 'Contributions citoyennes',
            value: safeStats.ideas,
            subtitle: 'Idées collectées',
            detail: `${safeStats.ideas_pending} en revue`,
            color: palette.red,
        },
        {
            title: 'Communautés engagées',
            value: safeStats.think_tank_total + safeStats.event_participants_total,
            subtitle: 'Membres actifs',
            detail: `${safeStats.subscribers_active} abonnés à la newsletter`,
            color: palette.green,
        },
    ];

    const metrics = [
        {
            label: 'Think Tank approuvés',
            value: safeStats.think_tank_approved,
            meta: `${safeStats.think_tank_pending} en attente`,
            color: palette.green,
        },
        {
            label: 'Participants confirmés',
            value: safeStats.event_participants_approved,
            meta: `${safeStats.event_participants_pending} à traiter`,
            color: palette.gold,
        },
        {
            label: 'Abonnés actifs',
            value: safeStats.subscribers_active,
            meta: `${safeStats.subscribers} au total`,
            color: palette.red,
        },
        {
            label: 'Messages ouverts',
            value: safeStats.messages_pending,
            meta: `${safeStats.messages_total} reçus`,
            color: palette.green,
        },
    ];

    const quickActions = [
        {
            title: 'Valider les idées',
            description: 'Consolider les propositions citoyennes.',
            href: '/admin/ideas',
            metric: safeStats.ideas_pending,
            color: palette.red,
        },
        {
            title: 'Think Tank',
            description: 'Gérer les groupes de travail.',
            href: '/admin/think-tank',
            metric: safeStats.think_tank_pending,
            color: palette.green,
        },
        {
            title: 'Événement',
            description: 'Confirmer les participants.',
            href: '/admin/event-participants',
            metric: safeStats.event_participants_pending,
            color: palette.gold,
        },
        {
            title: 'Messages directs',
            description: 'Répondre aux demandes reçues.',
            href: '/admin/messages',
            metric: safeStats.messages_pending,
            color: palette.red,
        },
    ];

    const chartData = useMemo(() => {
        const rows = [
            { label: 'Idées', value: safeStats.ideas, color: palette.red },
            { label: 'Think Tank', value: safeStats.think_tank_total, color: palette.green },
            { label: 'Événement', value: safeStats.event_participants_total, color: palette.gold },
            { label: 'Newsletter', value: safeStats.subscribers, color: palette.green },
        ];

        const max = rows.reduce((acc, row) => Math.max(acc, row.value), 1);
        return rows.map(row => ({
            ...row,
            percent: Math.round((row.value / max) * 100),
        }));
    }, [safeStats]);

    const activityFeed = Array.isArray(recentActivity) ? recentActivity.slice(0, 5) : [];
    const alertFeed = Array.isArray(notifications) ? notifications : [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
                    <section className="flex flex-col gap-3">
                        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Vue 360°</p>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-bold text-zinc-900">Bonjour Oumaima 👋</h1>
                                <p className="text-zinc-500 mt-1">Etat d’avancement de la plateforme sociale</p>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-zinc-500">
                                <TrendingUp className="w-5 h-5 text-royal-red" />
                                Mise à jour : {new Date().toLocaleDateString('fr-FR')}
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        {highlightCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="rounded-3xl p-6 text-white shadow-lg"
                                style={{ backgroundColor: card.color }}
                            >
                                <p className="text-xs uppercase tracking-[0.2em] opacity-80">{card.title}</p>
                                <div className="mt-4 flex items-end justify-between">
                                    <div>
                                        <p className="text-5xl font-semibold">{card.value}</p>
                                        <p className="text-sm opacity-80">{card.subtitle}</p>
                                    </div>
                                    <p className="text-sm opacity-90">{card.detail}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {metrics.map((metric, idx) => (
                            <Card key={idx} className="border border-zinc-100 shadow-sm">
                                <CardHeader className="pb-1">
                                    <CardTitle className="text-xs uppercase tracking-wide text-zinc-500">
                                        {metric.label}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-semibold" style={{ color: metric.color }}>
                                        {metric.value}
                                    </p>
                                    <p className="text-sm text-zinc-500">{metric.meta}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-semibold text-zinc-900">Actions rapides</h2>
                            <p className="text-sm text-zinc-500">Les flux prioritaires à traiter</p>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {quickActions.map((action, idx) => (
                                <Link key={idx} href={action.href}>
                                    <Card
                                        className="border-2 h-full hover:translate-y-[-4px] transition"
                                        style={{ borderColor: action.color }}
                                    >
                                        <CardHeader>
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-lg" style={{ color: action.color }}>
                                                    {action.title}
                                                </CardTitle>
                                                <span
                                                    className="px-2 py-1 rounded-full text-sm font-semibold text-white"
                                                    style={{ backgroundColor: action.color }}
                                                >
                                                    {action.metric}
                                                </span>
                                            </div>
                                            <p className="text-sm text-zinc-500">{action.description}</p>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center gap-2 text-sm font-medium" style={{ color: action.color }}>
                                                Accéder
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-3">
                        <Card className="lg:col-span-2 border border-zinc-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-zinc-900">
                                    <Activity className="w-5 h-5 text-royal-red" />
                                    Indicateurs clés
                                </CardTitle>
                                <p className="text-sm text-zinc-500">
                                    Répartition des volumes par piliers stratégiques.
                                </p>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {chartData.map((row, idx) => (
                                    <div key={idx}>
                                        <div className="flex justify-between text-sm text-zinc-600">
                                            <span>{row.label}</span>
                                            <span style={{ color: row.color }}>{row.value}</span>
                                        </div>
                                        <div className="h-2 bg-zinc-100 rounded-full mt-2">
                                            <div
                                                className="h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${row.percent}%`,
                                                    backgroundColor: row.color,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card className="border border-zinc-100 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-zinc-900">
                                        <Bell className="w-5 h-5 text-royal-red" />
                                        Alertes en cours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {alertFeed.length === 0 && (
                                        <p className="text-sm text-zinc-500">Aucune alerte active.</p>
                                    )}
                                    {alertFeed.map(alert => (
                                        <div key={alert.id} className="border-l-4 pl-3" style={{ borderColor: palette.red }}>
                                            <p className="text-sm font-semibold text-zinc-800">{alert.title}</p>
                                            <p className="text-sm text-zinc-500">{alert.message}</p>
                                            <span className="text-xs text-zinc-400">{alert.time}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card className="border border-zinc-100 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-zinc-900">
                                        <MessageSquare className="w-5 h-5 text-royal-green" />
                                        Activité récente
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {activityFeed.length === 0 && (
                                        <p className="text-sm text-zinc-500">Pas encore d’activité.</p>
                                    )}
                                    {activityFeed.map(item => (
                                        <div key={item.id} className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-zinc-100">
                                                <Users className="w-4 h-4 text-royal-green" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-semibold text-zinc-800">{item.action}</p>
                                                <p className="text-sm text-zinc-500">{item.user}</p>
                                                <span className="text-xs text-zinc-400">{item.time}</span>
                                            </div>
                                            <span
                                                className="text-xs font-semibold"
                                                style={{ color: item.status === 'pending' ? palette.red : palette.green }}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <Card className="border border-zinc-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-zinc-900">
                                    <CheckCircle className="w-5 h-5 text-royal-green" />
                                    Feuille de route
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-zinc-600">Revue des idées en attente</p>
                                    <span className="text-sm font-semibold" style={{ color: palette.red }}>
                                        {safeStats.ideas_pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-zinc-600">Inclusions Think Tank</p>
                                    <span className="text-sm font-semibold" style={{ color: palette.green }}>
                                        {safeStats.think_tank_pending}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm text-zinc-600">Messages à répondre</p>
                                    <span className="text-sm font-semibold" style={{ color: palette.red }}>
                                        {safeStats.messages_pending}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-zinc-100 shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-zinc-900">
                                    <Mail className="w-5 h-5 text-royal-red" />
                                    Newsletter & communauté
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-zinc-500">Actifs</p>
                                        <p className="text-3xl font-semibold text-zinc-900">{safeStats.subscribers_active}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-zinc-500">Total</p>
                                        <p className="text-3xl font-semibold" style={{ color: palette.green }}>
                                            {safeStats.subscribers}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href="/admin/newsletter"
                                    className="inline-flex items-center gap-2 text-sm font-semibold"
                                    style={{ color: palette.red }}
                                >
                                    Préparer la prochaine campagne
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </AppLayout>
    );
}