import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Podcasts', href: '/admin/podcasts' },
];

// Mock data for demonstration
const mockEpisodes = [
    { 
        id: 1, 
        title: 'Épisode 1 — Jeunesse et avenir', 
        description: 'Exploration des défis et opportunités pour la jeunesse marocaine dans un monde en transformation.',
        guests: 'Oumaima Mhijir, Dr. Ahmed Benali',
        theme: 'Éducation et Jeunesse',
        duration: '45 min',
        date: '2024-01-15',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
        audioUrl: 'https://example.com/episode1.mp3',
        status: 'published'
    },
    { 
        id: 2, 
        title: 'Épisode 2 — Santé pour tous', 
        description: 'Discussion sur les enjeux de santé publique et les solutions pour une couverture universelle.',
        guests: 'Dr. Fatima Zahra, Pr. Mohamed Alami',
        theme: 'Santé et Protection sociale',
        duration: '52 min',
        date: '2024-01-22',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
        audioUrl: 'https://example.com/episode2.mp3',
        status: 'published'
    },
    { 
        id: 3, 
        title: 'Épisode 3 — Économie solidaire', 
        description: 'Les nouvelles formes d\'économie collaborative et leur impact sur l\'emploi au Maroc.',
        guests: 'Oumaima Mhijir, Hassan El Mansouri',
        theme: 'Économie solidaire et Emploi',
        duration: '38 min',
        date: '2024-01-29',
        platforms: ['Spotify', 'YouTube', 'Apple Podcasts'],
        audioUrl: 'https://example.com/episode3.mp3',
        status: 'draft'
    },
];

const themes = [
    'Éducation et Jeunesse',
    'Santé et Protection sociale', 
    'Économie solidaire et Emploi',
    'Genre, Inclusion et Citoyenneté'
];

const platforms = ['Spotify', 'YouTube', 'Apple Podcasts', 'SoundCloud', 'Google Podcasts'];

export default function PodcastManagement() {
    const [activeTab, setActiveTab] = useState('episodes');
    const [episodes, setEpisodes] = useState(mockEpisodes);
    const [isEditing, setIsEditing] = useState(false);
    const [editingEpisode, setEditingEpisode] = useState(null);
    const [newEpisode, setNewEpisode] = useState({
        title: '',
        description: '',
        guests: '',
        theme: themes[0],
        duration: '',
        date: new Date().toISOString().split('T')[0],
        platforms: [],
        audioUrl: '',
        status: 'draft'
    });

    const addEpisode = () => {
        const episode = {
            ...newEpisode,
            id: episodes.length + 1,
            platforms: newEpisode.platforms.length > 0 ? newEpisode.platforms : platforms
        };
        setEpisodes(prev => [episode, ...prev]);
        setNewEpisode({
            title: '',
            description: '',
            guests: '',
            theme: themes[0],
            duration: '',
            date: new Date().toISOString().split('T')[0],
            platforms: [],
            audioUrl: '',
            status: 'draft'
        });
    };

    const editEpisode = (episode) => {
        setEditingEpisode(episode);
        setIsEditing(true);
    };

    const saveEpisode = () => {
        setEpisodes(prev => prev.map(ep => 
            ep.id === editingEpisode.id ? editingEpisode : ep
        ));
        setIsEditing(false);
        setEditingEpisode(null);
    };

    const deleteEpisode = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet épisode ?')) {
            setEpisodes(prev => prev.filter(ep => ep.id !== id));
        }
    };

    const togglePlatform = (platform) => {
        if (isEditing) {
            setEditingEpisode(prev => ({
                ...prev,
                platforms: prev.platforms.includes(platform)
                    ? prev.platforms.filter(p => p !== platform)
                    : [...prev.platforms, platform]
            }));
        } else {
            setNewEpisode(prev => ({
                ...prev,
                platforms: prev.platforms.includes(platform)
                    ? prev.platforms.filter(p => p !== platform)
                    : [...prev.platforms, platform]
            }));
        }
    };

    const EpisodeForm = ({ episode, onSave, onCancel, isNew = false }) => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="title" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Titre</Label>
                    <Input
                        id="title"
                        value={episode.title}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, title: e.target.value}) : setEditingEpisode({...editingEpisode, title: e.target.value})}
                        placeholder="Titre de l'épisode"
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="theme" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Thème</Label>
                    <select
                        id="theme"
                        value={episode.theme}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, theme: e.target.value}) : setEditingEpisode({...editingEpisode, theme: e.target.value})}
                        className="mt-2 w-full p-3 rounded-lg border border-zinc-300 focus:border-royal-red focus:ring-2 focus:ring-royal-red/20"
                    >
                        {themes.map(theme => (
                            <option key={theme} value={theme}>{theme}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <Label htmlFor="description" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Description</Label>
                <Textarea
                    id="description"
                    value={episode.description}
                    onChange={(e) => isNew ? setNewEpisode({...newEpisode, description: e.target.value}) : setEditingEpisode({...editingEpisode, description: e.target.value})}
                    rows={4}
                    className="mt-2"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="guests" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Invités</Label>
                    <Input
                        id="guests"
                        value={episode.guests}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, guests: e.target.value}) : setEditingEpisode({...editingEpisode, guests: e.target.value})}
                        placeholder="Noms des invités"
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="duration" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Durée</Label>
                    <Input
                        id="duration"
                        value={episode.duration}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, duration: e.target.value}) : setEditingEpisode({...editingEpisode, duration: e.target.value})}
                        placeholder="45 min"
                        className="mt-2"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="date" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Date de publication</Label>
                    <Input
                        id="date"
                        type="date"
                        value={episode.date}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, date: e.target.value}) : setEditingEpisode({...editingEpisode, date: e.target.value})}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Label htmlFor="audioUrl" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">URL Audio</Label>
                    <Input
                        id="audioUrl"
                        value={episode.audioUrl}
                        onChange={(e) => isNew ? setNewEpisode({...newEpisode, audioUrl: e.target.value}) : setEditingEpisode({...editingEpisode, audioUrl: e.target.value})}
                        placeholder="https://example.com/episode.mp3"
                        className="mt-2"
                    />
                </div>
            </div>

            <div>
                <Label className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Plateformes</Label>
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-3">
                    {platforms.map(platform => (
                        <label key={platform} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={episode.platforms.includes(platform)}
                                onChange={() => togglePlatform(platform)}
                                className="rounded border-zinc-300 text-royal-red focus:ring-royal-red"
                            />
                            <span className="text-sm text-zinc-700">{platform}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <Button 
                    onClick={onSave}
                    className="bg-royal-green text-white hover:bg-royal-green/90"
                >
                    {isNew ? 'Créer l\'épisode' : 'Sauvegarder'}
                </Button>
                <Button 
                    onClick={onCancel}
                    variant="outline"
                >
                    Annuler
                </Button>
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Podcasts" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">Gestion des Podcasts</h1>
                                <p className="text-zinc-600 mt-1">Créez et gérez les épisodes du podcast</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-sm text-zinc-600">Total épisodes</p>
                                    <p className="text-2xl font-bold text-royal-red-soft">{episodes.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                        <div className="flex gap-2">
                            {[
                                { id: 'episodes', label: 'Épisodes' },
                                { id: 'add', label: 'Nouvel Épisode' }
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

                    {/* Episodes Tab */}
                    {activeTab === 'episodes' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Liste des Épisodes</h2>
                            
                            <div className="space-y-4">
                                {episodes.map(episode => (
                                    <div key={episode.id} className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-zinc-800">{episode.title}</h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        episode.status === 'published' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {episode.status === 'published' ? 'Publié' : 'Brouillon'}
                                                    </span>
                                                </div>
                                                <p className="text-zinc-600 mb-3">{episode.description}</p>
                                                <div className="flex items-center gap-6 text-sm text-zinc-500">
                                                    <span><strong>Invités:</strong> {episode.guests}</span>
                                                    <span><strong>Thème:</strong> {episode.theme}</span>
                                                    <span><strong>Durée:</strong> {episode.duration}</span>
                                                    <span><strong>Date:</strong> {episode.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button 
                                                    size="sm"
                                                    onClick={() => editEpisode(episode)}
                                                    className="bg-royal-red text-white hover:bg-royal-red/90"
                                                >
                                                    Modifier
                                                </Button>
                                                <Button 
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => deleteEpisode(episode.id)}
                                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                                >
                                                    Supprimer
                                                </Button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-zinc-600">Disponible sur:</span>
                                            {episode.platforms.map(platform => (
                                                <span key={platform} className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded text-xs">
                                                    {platform}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add Episode Tab */}
                    {activeTab === 'add' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Nouvel Épisode</h2>
                            <EpisodeForm 
                                episode={newEpisode}
                                onSave={addEpisode}
                                onCancel={() => setActiveTab('episodes')}
                                isNew={true}
                            />
                        </div>
                    )}

                    {/* Edit Episode Modal */}
                    {isEditing && editingEpisode && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                                <h2 className="text-xl font-bold text-royal-red-soft mb-6">Modifier l'Épisode</h2>
                                <EpisodeForm 
                                    episode={editingEpisode}
                                    onSave={saveEpisode}
                                    onCancel={() => {
                                        setIsEditing(false);
                                        setEditingEpisode(null);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
