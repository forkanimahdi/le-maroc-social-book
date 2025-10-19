import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
];

// Real data fetching functions
const fetchStats = async () => {
    try {
        // Fetch from localStorage (simulated backend)
        const ideas = JSON.parse(localStorage.getItem('ms2030_ideas') || '[]');
        const subscribers = JSON.parse(localStorage.getItem('ms2030_newsletter') || '[]');
        const groupSignups = JSON.parse(localStorage.getItem('ms2030_groups') || '[]');
        
        return {
            totalIdeas: ideas.length,
            approvedIdeas: ideas.filter(i => i.status === 'approved').length,
            pendingIdeas: ideas.filter(i => i.status === 'pending').length,
            totalSubscribers: subscribers.length,
            groupSignups: groupSignups.length,
            podcastDownloads: Math.floor(Math.random() * 200) + 100, // Simulated
            websiteViews: Math.floor(Math.random() * 1000) + 800, // Simulated
            avgSessionTime: '3m 42s' // Simulated
        };
    } catch (error) {
        console.error('Error fetching stats:', error);
        return {
            totalIdeas: 0,
            approvedIdeas: 0,
            pendingIdeas: 0,
            totalSubscribers: 0,
            groupSignups: 0,
            podcastDownloads: 0,
            websiteViews: 0,
            avgSessionTime: '0m 0s'
        };
    }
};

const fetchRecentActivity = async () => {
    try {
        const ideas = JSON.parse(localStorage.getItem('ms2030_ideas') || '[]');
        const subscribers = JSON.parse(localStorage.getItem('ms2030_newsletter') || '[]');
        const groupSignups = JSON.parse(localStorage.getItem('ms2030_groups') || '[]');
        
        const activities = [];
        
        // Recent ideas
        ideas.slice(0, 3).forEach(idea => {
            activities.push({
                id: `idea-${idea.id}`,
                type: 'idea',
                action: idea.status === 'pending' ? 'Nouvelle idée soumise' : 'Idée approuvée',
                user: 'Utilisateur anonyme',
                time: 'Récent',
                status: idea.status
            });
        });
        
        // Recent subscribers
        subscribers.slice(0, 2).forEach(sub => {
            activities.push({
                id: `sub-${sub.id || Math.random()}`,
                type: 'subscriber',
                action: 'Nouvel abonné newsletter',
                user: sub.nom || 'Utilisateur anonyme',
                time: 'Récent',
                status: 'success'
            });
        });
        
        return activities.slice(0, 5);
    } catch (error) {
        console.error('Error fetching activity:', error);
        return [];
    }
};

const fetchNotifications = async () => {
    try {
        const ideas = JSON.parse(localStorage.getItem('ms2030_ideas') || '[]');
        const pendingCount = ideas.filter(i => i.status === 'pending').length;
        
        const notifications = [];
        
        if (pendingCount > 0) {
            notifications.push({
                id: 1,
                title: 'Nouvelles idées en attente',
                message: `${pendingCount} nouvelle${pendingCount > 1 ? 's' : ''} idée${pendingCount > 1 ? 's' : ''} nécessitent votre modération`,
                time: 'Maintenant',
                unread: true
            });
        }
        
        notifications.push({
            id: 2,
            title: 'Statistiques du jour',
            message: 'Consultez les dernières métriques de performance',
            time: '1h',
            unread: false
        });
        
        return notifications;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        return [];
    }
};

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalIdeas: 0,
        approvedIdeas: 0,
        pendingIdeas: 0,
        totalSubscribers: 0,
        groupSignups: 0,
        podcastDownloads: 0,
        websiteViews: 0,
        avgSessionTime: '0m 0s'
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [statsData, activityData, notificationsData] = await Promise.all([
                    fetchStats(),
                    fetchRecentActivity(),
                    fetchNotifications()
                ]);
                setStats(statsData);
                setRecentActivity(activityData);
                setNotifications(notificationsData);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
        
        // Refresh data every 30 seconds
        const interval = setInterval(loadData, 30000);
        return () => clearInterval(interval);
    }, []);

    const markNotificationAsRead = (id) => {
        setNotifications(prev => prev.map(notif => 
            notif.id === id ? { ...notif, unread: false } : notif
        ));
    };

    const StatCard = ({ title, value, change, icon, color = 'royal-red' }) => (
        <div className="bg-white rounded-lg border border-royal-red-soft p-6 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-zinc-600 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-royal-red-soft">{value}</p>
                    {change && (
                        <p className="text-xs text-zinc-500 mt-2">
                            <span className={change > 0 ? 'text-green-600' : 'text-red-600'}>
                                {change > 0 ? '+' : ''}{change}%
                            </span> vs mois dernier
                        </p>
                    )}
                </div>
                <div className={`w-14 h-14 bg-${color}-soft rounded-xl flex items-center justify-center group-hover:bg-${color} transition-all duration-300`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
            </div>
        </div>
    );

    const QuickAction = ({ title, description, icon, onClick, color = 'royal-red' }) => (
        <button 
            onClick={onClick}
            className="bg-white rounded-lg border border-royal-red-soft p-4 hover:shadow-md transition-all duration-300 text-left group w-full"
        >
            <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-${color}-soft rounded-lg flex items-center justify-center group-hover:bg-${color} transition-all duration-300`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-zinc-800 group-hover:text-royal-red transition-colors">{title}</h3>
                    <p className="text-sm text-zinc-600">{description}</p>
                </div>
            </div>
        </button>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Administrateur" />
            
            <div className="min-h-screen bg-cream">
                <div className="max-w-7xl mx-auto p-6 space-y-8">
                    {/* Hero Header */}
                    <div className="bg-gradient-to-br from-royal-red-soft to-gold-soft rounded-lg border border-royal-red-soft p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-royal-red-soft mb-2">Dashboard Administrateur</h1>
                                <p className="text-xl text-zinc-700">Vue d'ensemble du site Le Maroc Social 2030</p>
                            </div>
                            <div className="text-right">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                                    <p className="text-sm text-zinc-600">Dernière mise à jour</p>
                                    <p className="font-semibold text-royal-red-soft text-lg">{new Date().toLocaleTimeString('fr-FR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                        <div className="flex gap-2">
                            {[
                                { id: 'overview', label: 'Vue d\'ensemble' },
                                { id: 'analytics', label: 'Analytiques' },
                                { id: 'content', label: 'Contenu' },
                                { id: 'users', label: 'Utilisateurs' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                        activeTab === tab.id 
                                            ? 'bg-royal-red text-white shadow-md' 
                                            : 'text-zinc-600 hover:bg-royal-red-soft hover:text-royal-red'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Statistics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            title="Idées soumises"
                            value={loading ? '...' : stats.totalIdeas}
                            change={stats.totalIdeas > 0 ? +12 : null}
                            icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
                        />
                        <StatCard
                            title="Abonnés Newsletter"
                            value={loading ? '...' : stats.totalSubscribers}
                            change={stats.totalSubscribers > 0 ? +8 : null}
                            icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>}
                            color="royal-green"
                        />
                        <StatCard
                            title="Inscriptions Groupes"
                            value={loading ? '...' : stats.groupSignups}
                            change={stats.groupSignups > 0 ? +15 : null}
                            icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>}
                            color="gold"
                        />
                        <StatCard
                            title="Vues du site"
                            value={loading ? '...' : stats.websiteViews.toLocaleString()}
                            change={stats.websiteViews > 0 ? +23 : null}
                            icon={<svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>}
                            color="peach"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Quick Actions */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                                <h2 className="text-2xl font-bold text-royal-red-soft mb-6">Actions Rapides</h2>
                                <div className="space-y-4">
                                    <QuickAction
                                        title="Modérer les idées"
                                        description={`${stats.pendingIdeas} idées en attente`}
                                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}
                                        onClick={() => window.location.href = '/admin/users?tab=ideas'}
                                    />
                                    <QuickAction
                                        title="Envoyer Newsletter"
                                        description={`${stats.totalSubscribers} abonnés`}
                                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /></svg>}
                                        color="royal-green"
                                        onClick={() => window.location.href = '/admin/newsletter?tab=compose'}
                                    />
                                    <QuickAction
                                        title="Gérer Groupes"
                                        description={`${stats.groupSignups} inscriptions`}
                                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg>}
                                        color="gold"
                                        onClick={() => window.location.href = '/admin/users?tab=groups'}
                                    />
                                    <QuickAction
                                        title="Exporter Données"
                                        description="CSV, Excel"
                                        icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
                                        color="peach"
                                        onClick={() => window.location.href = '/admin/newsletter?tab=subscribers'}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                                <h2 className="text-2xl font-bold text-royal-red-soft mb-6">Activité Récente</h2>
                                <div className="space-y-4">
                                    {loading ? (
                                        <div className="text-center py-12 text-zinc-500">
                                            <div className="animate-spin w-8 h-8 border-4 border-royal-red-soft border-t-royal-red rounded-full mx-auto mb-4"></div>
                                            Chargement des activités...
                                        </div>
                                    ) : recentActivity.length === 0 ? (
                                        <div className="text-center py-12 text-zinc-500">
                                            <svg className="w-16 h-16 mx-auto mb-4 text-zinc-300" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                            </svg>
                                            <p className="text-lg font-medium">Aucune activité récente</p>
                                            <p className="text-sm">Les nouvelles activités apparaîtront ici</p>
                                        </div>
                                    ) : (
                                        recentActivity.map(activity => (
                                            <div key={activity.id} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-lg hover:bg-zinc-100 transition-colors">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                                    activity.status === 'pending' ? 'bg-yellow-100' :
                                                    activity.status === 'success' ? 'bg-green-100' :
                                                    activity.status === 'approved' ? 'bg-blue-100' : 'bg-gray-100'
                                                }`}>
                                                    <svg className={`w-5 h-5 ${
                                                        activity.status === 'pending' ? 'text-yellow-600' :
                                                        activity.status === 'success' ? 'text-green-600' :
                                                        activity.status === 'approved' ? 'text-blue-600' : 'text-gray-600'
                                                    }`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-zinc-800">{activity.action}</p>
                                                    <p className="text-sm text-zinc-600">par {activity.user}</p>
                                                </div>
                                                <span className="text-xs text-zinc-500 bg-zinc-200 px-2 py-1 rounded-full">{activity.time}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications Panel */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-royal-red-soft">Notifications</h2>
                            <span className="bg-royal-red text-white text-sm px-3 py-1 rounded-full font-medium">
                                {notifications.filter(n => n.unread).length} non lues
                            </span>
                        </div>
                        <div className="space-y-4">
                            {notifications.map(notification => (
                                <div 
                                    key={notification.id} 
                                    className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 ${
                                        notification.unread 
                                            ? 'bg-royal-red-soft border-royal-red hover:bg-royal-red-soft/80 shadow-md' 
                                            : 'bg-zinc-50 border-zinc-200 hover:bg-zinc-100'
                                    }`}
                                    onClick={() => markNotificationAsRead(notification.id)}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-3 h-3 rounded-full mt-2 ${notification.unread ? 'bg-royal-red' : 'bg-zinc-400'}`}></div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-semibold ${notification.unread ? 'text-royal-red' : 'text-zinc-800'}`}>
                                                {notification.title}
                                            </h3>
                                            <p className="text-zinc-600 mt-2">{notification.message}</p>
                                            <p className="text-sm text-zinc-500 mt-3">{notification.time}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Website Performance */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-2xl font-bold text-royal-red-soft mb-6">Performance du Site</h2>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Temps de chargement</span>
                                        <span className="text-green-600 font-semibold">1.2s</span>
                                    </div>
                                    <div className="w-full bg-zinc-200 rounded-full h-3">
                                        <div className="bg-green-500 h-3 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Score SEO</span>
                                        <span className="text-gold font-semibold">92/100</span>
                                    </div>
                                    <div className="w-full bg-zinc-200 rounded-full h-3">
                                        <div className="bg-gold h-3 rounded-full transition-all duration-1000" style={{width: '92%'}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Accessibilité</span>
                                        <span className="text-royal-green font-semibold">88/100</span>
                                    </div>
                                    <div className="w-full bg-zinc-200 rounded-full h-3">
                                        <div className="bg-royal-green h-3 rounded-full transition-all duration-1000" style={{width: '88%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-2xl font-bold text-royal-red-soft mb-6">Engagement</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-6 bg-gradient-to-br from-royal-red-soft to-gold-soft rounded-lg">
                                    <p className="text-3xl font-bold text-royal-red-soft">{stats.avgSessionTime}</p>
                                    <p className="text-sm text-zinc-600 font-medium">Temps moyen</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-royal-green-soft to-gold-soft rounded-lg">
                                    <p className="text-3xl font-bold text-royal-green-soft">68%</p>
                                    <p className="text-sm text-zinc-600 font-medium">Taux de rebond</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-gold-soft to-peach-soft rounded-lg">
                                    <p className="text-3xl font-bold text-gold">4.2</p>
                                    <p className="text-sm text-zinc-600 font-medium">Pages/vue</p>
                                </div>
                                <div className="text-center p-6 bg-gradient-to-br from-peach-soft to-royal-red-soft rounded-lg">
                                    <p className="text-3xl font-bold text-peach">89%</p>
                                    <p className="text-sm text-zinc-600 font-medium">Mobile</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}