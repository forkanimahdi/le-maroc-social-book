import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contenu', href: '/admin/content' },
];

// Mock data for demonstration
const mockContent = {
    bio: {
        title: "Biographie d'Oumaima Mhijir",
        content: `Oumaima Mhijir est une figure emblématique de la transformation sociale au Maroc. 
Autrice, chercheuse et entrepreneure sociale, elle consacre sa carrière à la promotion 
de la justice sociale, de la participation citoyenne et de l'égalité des chances.

Son approche unique combine analyse stratégique, recherche terrain et innovation sociale 
pour développer des cadres d'action concrets au service de l'intérêt général. 
À travers « Le Maroc Social 2030 », elle fédère des voix, des expériences et des 
expertises pour bâtir une ambition commune.

Chercheuse en politiques sociales et développement, fondatrice d'initiatives 
d'innovation sociale, mentor et formatrice en leadership citoyen, elle est également 
une conférencière reconnue sur la transformation sociale au Maroc et au-delà.`,
        quote: "La transformation sociale commence par l'écoute et se poursuit par l'action."
    },
    images: [
        { id: 1, title: "Conférence publique", url: "/assets/author-1.jpg", alt: "Oumaima lors d'une conférence" },
        { id: 2, title: "Travail de recherche", url: "/assets/author-2.jpg", alt: "Oumaima en recherche" },
        { id: 3, title: "Mentorat", url: "/assets/author-3.jpg", alt: "Oumaima en mentorat" },
        { id: 4, title: "Publications", url: "/assets/author-4.jpg", alt: "Oumaima avec ses publications" },
        { id: 5, title: "Engagement social", url: "/assets/author-5.jpg", alt: "Oumaima dans l'engagement social" },
        { id: 6, title: "Formation", url: "/assets/author-6.jpg", alt: "Oumaima en formation" },
    ],
    socialMedia: {
        linkedin: "https://linkedin.com/in/oumaima-mhijir",
        twitter: "https://twitter.com/oumaima_mhijir",
        instagram: "https://instagram.com/oumaima_mhijir"
    }
};

export default function ContentManagement() {
    const [activeTab, setActiveTab] = useState('bio');
    const [content, setContent] = useState(mockContent);
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(content.bio);

    const saveBio = () => {
        setContent(prev => ({ ...prev, bio: editedBio }));
        setIsEditing(false);
    };

    const addImage = () => {
        const newImage = {
            id: content.images.length + 1,
            title: "Nouvelle image",
            url: "",
            alt: ""
        };
        setContent(prev => ({ ...prev, images: [...prev.images, newImage] }));
    };

    const updateImage = (id, field, value) => {
        setContent(prev => ({
            ...prev,
            images: prev.images.map(img => 
                img.id === id ? { ...img, [field]: value } : img
            )
        }));
    };

    const removeImage = (id) => {
        setContent(prev => ({
            ...prev,
            images: prev.images.filter(img => img.id !== id)
        }));
    };

    const updateSocialMedia = (platform, url) => {
        setContent(prev => ({
            ...prev,
            socialMedia: { ...prev.socialMedia, [platform]: url }
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion du Contenu" />
            
            <div className="min-h-screen bg-cream p-6">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Header */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-royal-red-soft">Gestion du Contenu</h1>
                                <p className="text-zinc-600 mt-1">Gérez la biographie, images et informations de l'autrice</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                        <div className="flex gap-2">
                            {[
                                { id: 'bio', label: 'Biographie' },
                                { id: 'images', label: 'Images' },
                                { id: 'social', label: 'Réseaux Sociaux' }
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

                    {/* Bio Tab */}
                    {activeTab === 'bio' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-royal-red-soft">Biographie d'Oumaima Mhijir</h2>
                                <Button 
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="bg-royal-red text-white hover:bg-royal-red/90"
                                >
                                    {isEditing ? 'Annuler' : 'Modifier'}
                                </Button>
                            </div>

                            {isEditing ? (
                                <div className="space-y-6">
                                    <div>
                                        <Label htmlFor="bio-title" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Titre</Label>
                                        <Input
                                            id="bio-title"
                                            value={editedBio.title}
                                            onChange={(e) => setEditedBio({ ...editedBio, title: e.target.value })}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="bio-content" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Contenu</Label>
                                        <Textarea
                                            id="bio-content"
                                            value={editedBio.content}
                                            onChange={(e) => setEditedBio({ ...editedBio, content: e.target.value })}
                                            rows={12}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="bio-quote" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Citation</Label>
                                        <Input
                                            id="bio-quote"
                                            value={editedBio.quote}
                                            onChange={(e) => setEditedBio({ ...editedBio, quote: e.target.value })}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <Button 
                                            onClick={saveBio}
                                            className="bg-royal-green text-white hover:bg-royal-green/90"
                                        >
                                            Sauvegarder
                                        </Button>
                                        <Button 
                                            onClick={() => setIsEditing(false)}
                                            variant="outline"
                                        >
                                            Annuler
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-zinc-800 mb-3">{content.bio.title}</h3>
                                        <div className="prose max-w-none">
                                            {content.bio.content.split('\n').map((paragraph, index) => (
                                                <p key={index} className="text-zinc-700 leading-relaxed mb-4">
                                                    {paragraph}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-gold-soft p-4 rounded-lg border border-gold-soft">
                                        <blockquote className="text-lg italic text-zinc-800">
                                            "{content.bio.quote}"
                                        </blockquote>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Images Tab */}
                    {activeTab === 'images' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-royal-red-soft">Galerie d'Images</h2>
                                <Button 
                                    onClick={addImage}
                                    className="bg-royal-red text-white hover:bg-royal-red/90"
                                >
                                    Ajouter une image
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {content.images.map(image => (
                                    <div key={image.id} className="border border-zinc-200 rounded-lg p-4">
                                        <div className="aspect-square bg-zinc-100 rounded-lg mb-4 flex items-center justify-center">
                                            {image.url ? (
                                                <img src={image.url} alt={image.alt} className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <div className="text-zinc-400 text-center">
                                                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                                    </svg>
                                                    <p className="text-sm">Aucune image</p>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="space-y-3">
                                            <div>
                                                <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Titre</Label>
                                                <Input
                                                    value={image.title}
                                                    onChange={(e) => updateImage(image.id, 'title', e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                            
                                            <div>
                                                <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">URL de l'image</Label>
                                                <Input
                                                    value={image.url}
                                                    onChange={(e) => updateImage(image.id, 'url', e.target.value)}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="mt-1"
                                                />
                                            </div>
                                            
                                            <div>
                                                <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">Texte alternatif</Label>
                                                <Input
                                                    value={image.alt}
                                                    onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                                                    className="mt-1"
                                                />
                                            </div>
                                            
                                            <Button 
                                                onClick={() => removeImage(image.id)}
                                                size="sm"
                                                variant="outline"
                                                className="w-full text-red-600 border-red-200 hover:bg-red-50"
                                            >
                                                Supprimer
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Social Media Tab */}
                    {activeTab === 'social' && (
                        <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                            <h2 className="text-xl font-bold text-royal-red-soft mb-6">Réseaux Sociaux</h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="linkedin" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">LinkedIn</Label>
                                    <Input
                                        id="linkedin"
                                        value={content.socialMedia.linkedin}
                                        onChange={(e) => updateSocialMedia('linkedin', e.target.value)}
                                        placeholder="https://linkedin.com/in/username"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="twitter" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Twitter</Label>
                                    <Input
                                        id="twitter"
                                        value={content.socialMedia.twitter}
                                        onChange={(e) => updateSocialMedia('twitter', e.target.value)}
                                        placeholder="https://twitter.com/username"
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="instagram" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">Instagram</Label>
                                    <Input
                                        id="instagram"
                                        value={content.socialMedia.instagram}
                                        onChange={(e) => updateSocialMedia('instagram', e.target.value)}
                                        placeholder="https://instagram.com/username"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="bg-zinc-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-zinc-800 mb-3">Aperçu des liens</h3>
                                    <div className="flex gap-4">
                                        {Object.entries(content.socialMedia).map(([platform, url]) => (
                                            <a 
                                                key={platform}
                                                href={url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-3 py-2 bg-royal-red-soft text-royal-red rounded-lg hover:bg-royal-red hover:text-white transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    {platform === 'linkedin' && (
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                    )}
                                                    {platform === 'twitter' && (
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                                    )}
                                                    {platform === 'instagram' && (
                                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                                                    )}
                                                </svg>
                                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
