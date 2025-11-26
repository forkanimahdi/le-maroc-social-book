<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation d'inscription - Think Tank</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .email-header {
            background: linear-gradient(135deg, #1b4e0b 0%, #2d7a1a 100%);
            color: #ffffff;
            padding: 40px 30px;
            text-align: center;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .email-header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }
        .email-body {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #1b4e0b;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .content {
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .whatsapp-box {
            background-color: #f8f9fa;
            border-left: 4px solid #1b4e0b;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .whatsapp-box h3 {
            margin: 0 0 10px 0;
            color: #1b4e0b;
            font-size: 18px;
        }
        .whatsapp-box p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background-color: #1b4e0b;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }
        .footer a {
            color: #1b4e0b;
            text-decoration: none;
        }
        .info-box {
            background-color: #f0f7ed;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
        }
        .info-box p {
            margin: 5px 0;
            color: #555;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>THINK TANK</h1>
            <p>Le Maroc Social 2030</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $signup->nom }},
            </div>
            
            <div class="content">
                <p>Merci pour votre envie de rejoindre le <strong>Think Tank Le Maroc Social 2030</strong>.</p>
                
                @php
                    $groupLabels = [
                        'jeunesse' => 'Jeunesse, Éducation et Emploi',
                        'femmes' => 'Femmes, Travail Invisible et Sécurité Sociale',
                        'vieillissement' => 'Vieillissement, Santé et Transitions Démographiques',
                        'pacte' => 'Pacte National, Territoires et Engagement Citoyen',
                    ];
                    $groupName = $groupLabels[$signup->group] ?? ucfirst($signup->group);
                    $channelLink = $whatsappChannelLink ?? config('app.whatsapp_channel');
                @endphp
                <p>Je confirme que j'ai bien reçu votre inscription pour le groupe <strong>{{ $groupName }}</strong>. Je prends le temps d'étudier chaque candidature afin de préserver la qualité des échanges.</p>
                
                <div class="info-box">
                    <p><strong>Détails de votre inscription :</strong></p>
                    <p>Groupe : {{ $groupName }}</p>
                    <p>Email : {{ $signup->email }}</p>
                    @if($signup->domain_expertise)
                        <p>Domaine d'expertise : {{ $signup->domain_expertise }}</p>
                    @endif
                </div>
            </div>
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>J'examine personnellement votre candidature.</li>
                    <li>Vous recevrez un e-mail dès que je pourrai confirmer votre intégration.</li>
                    <li>En cas d'approbation, je vous transmettrai le lien du groupe WhatsApp officiel.</li>
                </ul>
                <p style="margin-top: 20px;">
                    Pour rester informé·e des annonces clés, je vous invite à rejoindre le canal WhatsApp du Think Tank.
                </p>
            </div>

            @include('emails.partials.whatsapp-channel', ['channelLink' => $channelLink])
            @include('emails.partials.think-tank-invite')
            @include('emails.partials.signature')
        </div>
        
        <div class="footer">
            <p><strong>Oumaima Mhijir</strong></p>
            <p><a href="{{ config('app.url', 'https://ms2030.org') }}" style="color:#1b4e0b; text-decoration:none;">Visiter le site</a></p>
        </div>
    </div>
</body>
</html>

