import AppLayout from '@/layouts/app-layout';
import { Head, usePage, router, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contenu', href: '/admin/content' },
];

export default function ContentManagement() {
    const { props } = usePage();
    const backendContent = props.content;

    console.log(backendContent);
    
const {post , put , reset, processing , } = useForm();
    // Initialize state from backend
    const [activeTab, setActiveTab] = useState('bio');
    const [content, setContent] = useState({
        bio: {
            title: backendContent?.bio_title || '',
            content: backendContent?.bio_content || '',
            quote: backendContent?.bio_quote || '',
        },
        images: backendContent?.images || [],
        socialMedia: {
            linkedin: backendContent?.social_linkedin || '',
            twitter: backendContent?.social_twitter || '',
            instagram: backendContent?.social_instagram || '',
        },
    });
    const [isEditing, setIsEditing] = useState(false);
    const [editedBio, setEditedBio] = useState(content.bio);

    useEffect(() => {
        setEditedBio(content.bio);
    }, [content.bio]);

    // Save bio updates
    const saveBio = () => {
       router.put('/admin/content/update',
            
            {
                bio_title: editedBio.title,
                bio_content: editedBio.content,
                bio_quote: editedBio.quote,
                social_linkedin: content.socialMedia.linkedin,
                social_twitter: content.socialMedia.twitter,
                social_instagram: content.socialMedia.instagram,
            },
            {
                onSuccess: () => {
                    setContent(prev => ({
                        ...prev,
                        bio: editedBio,
                    }));
                    setIsEditing(false);
                },
                onError: (errors) => {
                    console.error('Error saving bio:', errors);
                    alert('Erreur lors de la sauvegarde.');
                },
                preserveScroll: true,
            }
        );
    };

    // Images CRUD
    const addImage = () => {
        const newImage = {
            id: Date.now(),
            title: 'Nouvelle image',
            url: '',
            alt: '',
            file: null,
        };
        setContent(prev => ({ ...prev, images: [...prev.images, newImage] }));
    };

    const updateImage = (id, field, value) => {
        setContent(prev => ({
            ...prev,
            images: prev.images.map(img =>
                img.id === id ? { ...img, [field]: value } : img
            ),
        }));
    };

    const handleImageFile = (id, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setContent(prev => ({
                    ...prev,
                    images: prev.images.map(img =>
                        img.id === id ? { ...img, file: file, preview: reader.result } : img
                    ),
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = id => {
        setContent(prev => ({
            ...prev,
            images: prev.images.filter(img => img.id !== id),
        }));
    };

    const saveImages = () => {
        // Don't save if no images
        if (!content.images || content.images.length === 0) {
            alert('Ajoutez au moins une image avant de sauvegarder.');
            return;
        }

        const formData = new FormData();
        
        // Prepare images data
        const imagesData = content.images.map(img => ({
            id: img.id,
            title: img.title || '',
            url: img.url || '',
            alt: img.alt || '',
        }));
        
        formData.append('images', JSON.stringify(imagesData));
        
        // Append files
        content.images.forEach((img, index) => {
            if (img.file) {
                formData.append(`image_${index}`, img.file);
                formData.append(`image_index_${index}`, img.id);
            }
        });

        router.post('/admin/content/images',
            formData,
            {
                forceFormData: true,
                onSuccess: () => {
                    alert('Images mises à jour avec succès !');
                    // Reset file references
                    setContent(prev => ({
                        ...prev,
                        images: prev.images.map(img => ({ ...img, file: null, preview: null }))
                    }));
                },
                onError: (errors) => {
                    console.error('Error saving images:', errors);
                    alert('Erreur lors de la sauvegarde des images.');
                },
                preserveScroll: true,
            }
        );
    };

    const updateSocialMedia = (platform, url) => {
        setContent(prev => ({
            ...prev,
            socialMedia: { ...prev.socialMedia, [platform]: url },
        }));
    };

    return (<AppLayout breadcrumbs={breadcrumbs}> <Head title="Gestion du Contenu" />

        ```
        <div className="min-h-screen bg-cream p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-royal-red-soft">
                                Gestion du Contenu
                            </h1>
                            <p className="text-zinc-600 mt-1">
                                Gérez la biographie, images et informations de l'autrice
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="bg-white rounded-lg border border-royal-red-soft p-2">
                    <div className="flex gap-2">
                        {[
                            { id: 'bio', label: 'Biographie' },
                            { id: 'images', label: 'Images' },
                            { id: 'social', label: 'Réseaux Sociaux' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === tab.id
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
                            <h2 className="text-xl font-bold text-royal-red-soft">
                                Biographie d'Oumaima Mhijir
                            </h2>
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
                                    <Label htmlFor="bio-title" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">
                                        Titre
                                    </Label>
                                    <Input
                                        id="bio-title"
                                        value={editedBio.title}
                                        onChange={e =>
                                            setEditedBio({ ...editedBio, title: e.target.value })
                                        }
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bio-content" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">
                                        Contenu
                                    </Label>
                                    <Textarea
                                        id="bio-content"
                                        value={editedBio.content}
                                        onChange={e =>
                                            setEditedBio({ ...editedBio, content: e.target.value })
                                        }
                                        rows={12}
                                        className="mt-2"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="bio-quote" className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide">
                                        Citation
                                    </Label>
                                    <Input
                                        id="bio-quote"
                                        value={editedBio.quote}
                                        onChange={e =>
                                            setEditedBio({ ...editedBio, quote: e.target.value })
                                        }
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
                                    <Button onClick={() => setIsEditing(false)} variant="outline">
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-800 mb-3">
                                        {content.bio.title}
                                    </h3>
                                    <div className="prose max-w-none">
                                        {content.bio.content
                                            .split('\n')
                                            .map((paragraph, index) => (
                                                <p
                                                    key={index}
                                                    className="text-zinc-700 leading-relaxed mb-4"
                                                >
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
                            <h2 className="text-xl font-bold text-royal-red-soft">
                                Galerie d'Images
                            </h2>
                            <Button
                                onClick={addImage}
                                className="bg-royal-red text-white hover:bg-royal-red/90"
                            >
                                Ajouter une image
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {content.images.map(image => (
                                <div
                                    key={image.id}
                                    className="border border-zinc-200 rounded-lg p-4"
                                >
                                    <div className="aspect-square bg-zinc-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                                        {image.preview || image.url ? (
                                            <img
                                                src={image.preview || image.url.slice(8)}
                                                alt={image.alt}
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="text-zinc-400 text-center">
                                                <svg
                                                    className="w-12 h-12 mx-auto mb-2"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <p className="text-sm">Aucune image</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <div>
                                            <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                                                Fichier image
                                            </Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => {
                                                    const file = e.target.files[0];
                                                    if (file) {
                                                        handleImageFile(image.id, file);
                                                    }
                                                }}
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                                                Titre
                                            </Label>
                                            <Input
                                                value={image.title}
                                                onChange={e =>
                                                    updateImage(image.id, 'title', e.target.value)
                                                }
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                                                URL de l'image (alternatif)
                                            </Label>
                                            <Input
                                                value={image.url}
                                                onChange={e =>
                                                    updateImage(image.id, 'url', e.target.value)
                                                }
                                                placeholder="https://example.com/image.jpg"
                                                className="mt-1"
                                            />
                                        </div>

                                        <div>
                                            <Label className="text-xs font-semibold text-zinc-600 uppercase tracking-wide">
                                                Texte alternatif
                                            </Label>
                                            <Input
                                                value={image.alt}
                                                onChange={e =>
                                                    updateImage(image.id, 'alt', e.target.value)
                                                }
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

                        {content.images.length > 0 && (
                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={saveImages}
                                    className="bg-royal-green text-white hover:bg-royal-green/90"
                                >
                                    Sauvegarder les images
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Social Media Tab */}
                {activeTab === 'social' && (
                    <div className="bg-white rounded-lg border border-royal-red-soft p-6">
                        <h2 className="text-xl font-bold text-royal-red-soft mb-6">
                            Réseaux Sociaux
                        </h2>

                        <div className="space-y-6">
                            {['linkedin', 'twitter', 'instagram'].map(platform => (
                                <div key={platform}>
                                    <Label
                                        htmlFor={platform}
                                        className="text-sm font-semibold text-royal-red-soft uppercase tracking-wide"
                                    >
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </Label>
                                    <Input
                                        id={platform}
                                        value={content.socialMedia[platform]}
                                        onChange={e =>
                                            updateSocialMedia(platform, e.target.value)
                                        }
                                        placeholder={`https://${platform}.com/username`}
                                        className="mt-2"
                                    />
                                </div>
                            ))}

                            <div className="bg-zinc-50 p-4 rounded-lg">
                                <h3 className="font-semibold text-zinc-800 mb-3">
                                    Aperçu des liens
                                </h3>
                                <div className="flex gap-4 flex-wrap">
                                    {Object.entries(content.socialMedia).map(([platform, url]) => (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 bg-royal-red-soft text-royal-red rounded-lg hover:bg-royal-red hover:text-white transition-colors"
                                        >
                                            <span className="capitalize">{platform}</span>
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
