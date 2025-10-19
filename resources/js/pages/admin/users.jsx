import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Utilisateurs', href: '/admin/users' },
];

// Mock data for demonstration
const mockUsers = [
    { id: 1, name: 'Ahmed Benali', email: 'ahmed@example.com', type: 'subscriber', joined_at: '2024-01-15', status: 'active', ideas_count: 2, groups_count: 1 },
    { id: 2, name: 'Fatima Zahra', email: 'fatima@example.com', type: 'group_member', joined_at: '2024-01-16', status: 'active', ideas_count: 1, groups_count: 2 },
    { id: 3, name: 'Youssef Tazi', email: 'youssef@example.com', type: 'subscriber', joined_at: '2024-01-17', status: 'active', ideas_count: 0, groups_count: 1 },
    { id: 4, name: 'Aicha El Alaoui', email: 'aicha@example.com', type: 'subscriber', joined_at: '2024-01-18', status: 'inactive', ideas_count: 3, groups_count: 0 },
    { id: 5, name: 'Hassan El Mansouri', email: 'hassan@example.com', type: 'group_member', joined_at: '2024-01-19', status: 'active', ideas_count: 1, groups_count: 3 },
];

const mockIdeas = [
    { id: 1, user: 'Ahmed Benali', content: 'Proposition pour améliorer l\'éducation numérique au Maroc', status: 'approved', created_at: '2024-01-20' },
    { id: 2, user: 'Fatima Zahra', content: 'Initiative pour la santé mentale des jeunes', status: 'pending', created_at: '2024-01-21' },
    { id: 3, user: 'Aicha El Alaoui', content: 'Projet d\'économie circulaire dans les quartiers', status: 'approved', created_at: '2024-01-22' },
    { id: 4, user: 'Hassan El Mansouri', content: 'Programme de mentorat pour les entrepreneurs', status: 'pending', created_at: '2024-01-23' },
];

const mockGroupSignups = [
    { id: 1, user: 'Fatima Zahra', group: 'Éducation et Jeunesse', motivation: 'Passionnée par l\'éducation inclusive', created_at: '2024-01-20' },
    { id: 2, user: 'Youssef Tazi', group: 'Santé et Protection sociale', motivation: 'Expert en santé publique', created_at: '2024-01-21' },
    { id: 3, user: 'Hassan El Mansouri', group: 'Économie solidaire et Emploi', motivation: 'Entrepreneur social', created_at: '2024-01-22' },
];

export default function UserManagement() {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState(mockUsers);
    const [ideas, setIdeas] = useState(mockIdeas);
    const [groupSignups, setGroupSignups] = useState(mockGroupSignups);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || user.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const approveIdea = (id) => {
        setIdeas(prev => prev.map(idea => 
            idea.id === id ? { ...idea, status: 'approved' } : idea
        ));
    };

    const rejectIdea = (id) => {
        setIdeas(prev => prev.map(idea => 
            idea.id === id ? { ...idea, status: 'rejected' } : idea
        ));
    };

    const exportUsers = () => {
        const csvContent = [
            ['Nom', 'Email', 'Type', 'Date d\'inscription', 'Statut', 'Idées', 'Groupes'],
            ...filteredUsers.map(user => [
                user.name, 
                user.email, 
                user.type, 
                user.joined_at, 
                user.status,
                user.ideas_count,
                user.groups_count
            ])
        ].map(row => row.join(',')).join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Utilisateurs" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">Gestion des Utilisateurs</h1>
                                <p className="text-zinc-600 mt-1">Gérez les utilisateurs, idées et inscriptions aux groupes</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-zinc-600">Total utilisateurs</p>
                                    <p className="text-2xl font-bold text-royal-red-soft">{users.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                        <div className="flex gap-2">
                            {[
                                { id: 'users', label: 'Utilisateurs' },
                                { id: 'ideas', label: 'Modération Idées' },
                                { id: 'groups', label: 'Inscriptions Groupes' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                        activeTab === tab.id 
                                            ? 'bg-royal-red text-white' 
                                            : 'text-zinc-600 hover:bg-royal-red-soft hover:text-royal-red'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Users Tab */}
                    {activeTab === 'users' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-royal-red-soft">Liste des Utilisateurs</h2>
                                <Button onClick={exportUsers} className="bg-royal-green text-white hover:bg-royal-green/90">
                                    Exporter CSV
                                </Button>
                            </div>

                            {/* Filters */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1">
                                    <Input
                                        placeholder="Rechercher par nom ou email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value)}
                                    className="px-3 py-2 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                                >
                                    <option value="all">Tous les types</option>
                                    <option value="subscriber">Abonnés</option>
                                    <option value="group_member">Membres de groupes</option>
                                </select>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-zinc-200">
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Nom</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Email</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Type</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Date d'inscription</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Statut</th>
                                            <th className="text-left py-3 px-4 font-semibold text-zinc-800">Activité</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map(user => (
                                            <tr key={user.id} className="border-b border-zinc-100 hover:bg-zinc-50">
                                                <td className="py-3 px-4 text-zinc-800">{user.name}</td>
                                                <td className="py-3 px-4 text-zinc-600">{user.email}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.type === 'subscriber' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : 'bg-green-100 text-green-800'
                                                    }`}>
                                                        {user.type === 'subscriber' ? 'Abonné' : 'Membre Groupe'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-zinc-600">{user.joined_at}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        user.status === 'active' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {user.status === 'active' ? 'Actif' : 'Inactif'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-zinc-600">
                                                    {user.ideas_count} idées, {user.groups_count} groupes
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Ideas Moderation Tab */}
                    {activeTab === 'ideas' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Modération des Idées</h2>
                            
                            <div className="space-y-4">
                                {ideas.map(idea => (
                                    <div key={idea.id} className="border border-zinc-200 rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-zinc-800">{idea.user}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        idea.status === 'approved' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : idea.status === 'pending'
                                                            ? 'bg-yellow-100 text-yellow-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {idea.status === 'approved' ? 'Approuvée' : 
                                                         idea.status === 'pending' ? 'En attente' : 'Rejetée'}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-700 mb-3">{idea.content}</p>
                                                <p className="text-sm text-zinc-500">Soumise le {idea.created_at}</p>
                                            </div>
                                        </div>
                                        
                                        {idea.status === 'pending' && (
                                            <div className="flex gap-3">
                                                <Button 
                                                    onClick={() => approveIdea(idea.id)}
                                                    size="sm"
                                                    className="bg-green-600 text-white hover:bg-green-700"
                                                >
                                                    Approuver
                                                </Button>
                                                <Button 
                                                    onClick={() => rejectIdea(idea.id)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                                >
                                                    Rejeter
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Group Signups Tab */}
                    {activeTab === 'groups' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Inscriptions aux Groupes</h2>
                            
                            <div className="space-y-4">
                                {groupSignups.map(signup => (
                                    <div key={signup.id} className="border border-zinc-200 rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="font-semibold text-zinc-800">{signup.user}</h3>
                                                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                                                        {signup.group}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-700 mb-3">{signup.motivation}</p>
                                                <p className="text-sm text-zinc-500">Inscrit le {signup.created_at}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex gap-3">
                                            <Button 
                                                size="sm"
                                                className="bg-royal-green text-white hover:bg-royal-green/90"
                                            >
                                                Confirmer l'inscription
                                            </Button>
                                            <Button 
                                                size="sm"
                                                variant="outline"
                                                className="text-red-600 border-red-200 hover:bg-red-50"
                                            >
                                                Refuser
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
