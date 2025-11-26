<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Félicitations - Votre candidature a été approuvée</title>
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
        .success-box {
            background-color: #f0f7ed;
            border-left: 4px solid #1b4e0b;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .success-box h3 {
            margin: 0 0 10px 0;
            color: #1b4e0b;
            font-size: 20px;
        }
        .success-box p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
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
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>FÉLICITATIONS !</h1>
            <p>Votre candidature a été approuvée</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $signup->nom }},
            </div>
            
            <div class="success-box">
                <h3>🎉 Excellente nouvelle !</h3>
                <p>Je suis ravie de vous confirmer votre intégration au <strong>Think Tank Le Maroc Social 2030</strong>.</p>
            </div>
            
            @php
                $groupLabels = [
                    'jeunesse' => 'Jeunesse, Éducation et Emploi',
                    'femmes' => 'Femmes, Travail Invisible et Sécurité Sociale',
                    'vieillissement' => 'Vieillissement, Santé et Transitions Démographiques',
                    'pacte' => 'Pacte National, Territoires et Engagement Citoyen',
                ];
                $groupName = $groupLabels[$signup->group] ?? ucfirst($signup->group);
                $channelLink = config('app.whatsapp_channel');
            @endphp
            <div class="content">
                <p>Votre engagement et votre expertise sont précieux pour porter cette ambition collective.</p>
                
                <p><strong>Vous êtes désormais membre du groupe :</strong> {{ $groupName }}</p>
            </div>
            
            <div class="whatsapp-box">
                <h3>📱 Rejoignez le groupe WhatsApp officiel</h3>
                <p>En tant que membre approuvé, vous accédez au groupe WhatsApp officiel du Think Tank. Ce cercle privé vous permettra de :</p>
                <ul style="color: #666; line-height: 2; margin: 10px 0;">
                    <li>Échanger directement avec les autres membres</li>
                    <li>Participer aux travaux du groupe</li>
                    <li>Recevoir les mises à jour importantes</li>
                    <li>Co-créer les projets et initiatives</li>
                </ul>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="{{ $whatsappGroupLink }}" class="cta-button" target="_blank">Rejoindre le groupe WhatsApp officiel</a>
                </div>
                <p style="text-align: center; font-size: 12px; color: #999; margin-top: 10px;">
                    Ce lien est personnel et confidentiel. Ne le partagez pas.
                </p>
            </div>
            
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Rejoignez immédiatement le groupe WhatsApp via le lien ci-dessus.</li>
                    <li>Présentez-vous aux membres pour lancer les échanges.</li>
                    <li>Participez activement aux discussions thématiques.</li>
                    <li>Restez attentif·ve aux annonces partagées sur le canal.</li>
                </ul>
                <p style="margin-top: 20px;">
                    Pour suivre les communications publiques du Think Tank, rejoignez également mon canal WhatsApp officiel.
                </p>
            </div>

            @include('emails.partials.whatsapp-channel', ['channelLink' => $channelLink])
            @include('emails.partials.signature')
        </div>
        
        <div class="footer">
            <p><strong>Le Maroc Social 2030</strong></p>
            <p>Un projet de réflexion et de plaidoyer pour concevoir des actions concrètes</p>
            <p>et transformer le Maroc social de demain.</p>
            <p style="margin-top: 20px;">
                <a href="{{ config('app.url', 'https://ms2030.org') }}">Visiter ms2030.org</a> | 
                <a href="mailto:mhijiroum@gmail.com">Me contacter</a>
            </p>
        </div>
    </div>
</body>
</html>

