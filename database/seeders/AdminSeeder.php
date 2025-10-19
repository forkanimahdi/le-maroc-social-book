<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Subscriber;
use App\Models\Newsletter;
use App\Models\Content;
use App\Models\PodcastEpisode;
use App\Models\Idea;
use App\Models\GroupSignup;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user if not exists
        User::firstOrCreate(
            ['email' => 'admin@maroc-social.test'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        // Create sample subscribers
        $subscribers = [
            ['name' => 'Ahmed Benali', 'email' => 'ahmed@example.com'],
            ['name' => 'Fatima Zahra', 'email' => 'fatima@example.com'],
            ['name' => 'Youssef Tazi', 'email' => 'youssef@example.com'],
            ['name' => 'Aicha El Alaoui', 'email' => 'aicha@example.com'],
            ['name' => 'Hassan El Mansouri', 'email' => 'hassan@example.com'],
        ];

        foreach ($subscribers as $subscriber) {
            Subscriber::firstOrCreate(
                ['email' => $subscriber['email']],
                ['nom' => $subscriber['name']]
            );
        }

        // Create sample newsletters
        Newsletter::create([
            'subject' => 'Actualités du Maroc Social 2030 - Janvier 2024',
            'content' => 'Découvrez les dernières nouvelles et initiatives du projet Le Maroc Social 2030.',
            'sent_at' => now()->subDays(5),
            'recipients_count' => 5,
            'open_rate' => 68.5,
            'click_rate' => 12.3,
        ]);

        Newsletter::create([
            'subject' => 'Nouvelles idées approuvées',
            'content' => 'Plusieurs nouvelles idées ont été approuvées et sont maintenant visibles publiquement.',
            'sent_at' => now()->subDays(10),
            'recipients_count' => 5,
            'open_rate' => 72.1,
            'click_rate' => 18.7,
        ]);

        // Create sample content
        Content::create([
            'bio_title' => "Biographie d'Oumaima Mhijir",
            'bio_content' => "Oumaima Mhijir est une figure emblématique de la transformation sociale au Maroc. Autrice, chercheuse et entrepreneure sociale, elle consacre sa carrière à la promotion de la justice sociale, de la participation citoyenne et de l'égalité des chances.\n\nSon approche unique combine analyse stratégique, recherche terrain et innovation sociale pour développer des cadres d'action concrets au service de l'intérêt général. À travers « Le Maroc Social 2030 », elle fédère des voix, des expériences et des expertises pour bâtir une ambition commune.\n\nChercheuse en politiques sociales et développement, fondatrice d'initiatives d'innovation sociale, mentor et formatrice en leadership citoyen, elle est également une conférencière reconnue sur la transformation sociale au Maroc et au-delà.",
            'bio_quote' => "La transformation sociale commence par l'écoute et se poursuit par l'action.",
            'images' => json_encode([
                ['id' => 1, 'title' => 'Conférence publique', 'url' => '/assets/author-1.jpg', 'alt' => 'Oumaima lors d\'une conférence'],
                ['id' => 2, 'title' => 'Travail de recherche', 'url' => '/assets/author-2.jpg', 'alt' => 'Oumaima en recherche'],
                ['id' => 3, 'title' => 'Mentorat', 'url' => '/assets/author-3.jpg', 'alt' => 'Oumaima en mentorat'],
                ['id' => 4, 'title' => 'Publications', 'url' => '/assets/author-4.jpg', 'alt' => 'Oumaima avec ses publications'],
                ['id' => 5, 'title' => 'Engagement social', 'url' => '/assets/author-5.jpg', 'alt' => 'Oumaima dans l\'engagement social'],
                ['id' => 6, 'title' => 'Formation', 'url' => '/assets/author-6.jpg', 'alt' => 'Oumaima en formation'],
            ]),
            'social_linkedin' => 'https://linkedin.com/in/oumaima-mhijir',
            'social_twitter' => 'https://twitter.com/oumaima_mhijir',
            'social_instagram' => 'https://instagram.com/oumaima_mhijir',
        ]);

        // Create sample podcast episodes
        PodcastEpisode::create([
            'title' => 'Épisode 1 — Jeunesse et avenir',
            'description' => 'Exploration des défis et opportunités pour la jeunesse marocaine dans un monde en transformation.',
            'guests' => 'Oumaima Mhijir, Dr. Ahmed Benali',
            'theme' => 'Éducation et Jeunesse',
            'duration' => '45 min',
            'date' => now()->subDays(20),
            'platforms' => json_encode(['Spotify', 'YouTube', 'Apple Podcasts']),
            'audio_url' => 'https://example.com/episode1.mp3',
            'status' => 'published',
        ]);

        PodcastEpisode::create([
            'title' => 'Épisode 2 — Santé pour tous',
            'description' => 'Discussion sur les enjeux de santé publique et les solutions pour une couverture universelle.',
            'guests' => 'Dr. Fatima Zahra, Pr. Mohamed Alami',
            'theme' => 'Santé et Protection sociale',
            'duration' => '52 min',
            'date' => now()->subDays(15),
            'platforms' => json_encode(['Spotify', 'YouTube', 'Apple Podcasts']),
            'audio_url' => 'https://example.com/episode2.mp3',
            'status' => 'published',
        ]);

        PodcastEpisode::create([
            'title' => 'Épisode 3 — Économie solidaire',
            'description' => 'Les nouvelles formes d\'économie collaborative et leur impact sur l\'emploi au Maroc.',
            'guests' => 'Oumaima Mhijir, Hassan El Mansouri',
            'theme' => 'Économie solidaire et Emploi',
            'duration' => '38 min',
            'date' => now()->subDays(10),
            'platforms' => json_encode(['Spotify', 'YouTube', 'Apple Podcasts']),
            'audio_url' => 'https://example.com/episode3.mp3',
            'status' => 'draft',
        ]);

        // Create sample ideas
        $ideas = [
            ['text' => 'Proposition pour améliorer l\'éducation numérique au Maroc', 'status' => 'approved'],
            ['text' => 'Initiative pour la santé mentale des jeunes', 'status' => 'pending'],
            ['text' => 'Projet d\'économie circulaire dans les quartiers', 'status' => 'approved'],
            ['text' => 'Programme de mentorat pour les entrepreneurs', 'status' => 'pending'],
        ];

        foreach ($ideas as $idea) {
            Idea::create([
                'text' => $idea['text'],
                'status' => $idea['status'],
                'agree' => true,
                'created_at' => now()->subDays(rand(1, 10)),
            ]);
        }

        // Create sample group signups
        $groupSignups = [
            ['group' => 'Éducation et Jeunesse', 'motivation' => 'Passionnée par l\'éducation inclusive'],
            ['group' => 'Santé et Protection sociale', 'motivation' => 'Expert en santé publique'],
            ['group' => 'Économie solidaire et Emploi', 'motivation' => 'Entrepreneur social'],
        ];

        foreach ($groupSignups as $signup) {
            GroupSignup::create([
                'group' => $signup['group'],
                'nom' => 'Utilisateur Test',
                'email' => 'test@example.com',
                'domaine' => 'Test',
                'motivation' => $signup['motivation'],
                'created_at' => now()->subDays(rand(1, 5)),
            ]);
        }
    }
}