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
                <p>Merci de votre intérêt pour rejoindre le <strong>Think Tank Le Maroc Social 2030</strong>.</p>
                
                @php
                    $groupLabels = [
                        'jeunesse' => 'Jeunesse, Éducation et Emploi',
                        'femmes' => 'Femmes, Travail Invisible et Sécurité Sociale',
                        'vieillissement' => 'Vieillissement, Santé et Transitions Démographiques',
                        'pacte' => 'Pacte National, Territoires et Engagement Citoyen',
                    ];
                    $groupName = $groupLabels[$signup->group] ?? ucfirst($signup->group);
                @endphp
                <p>Nous avons bien reçu votre inscription au <strong>{{ $groupName }}</strong>. Votre candidature est en cours d'examen par notre équipe.</p>
                
                <div class="info-box">
                    <p><strong>Détails de votre inscription :</strong></p>
                    <p>Groupe : {{ $groupName }}</p>
                    <p>Email : {{ $signup->email }}</p>
                    @if($signup->domain_expertise)
                        <p>Domaine d'expertise : {{ $signup->domain_expertise }}</p>
                    @endif
                </div>
            </div>
            
            <div class="whatsapp-box">
                <h3>📱 Rejoignez notre communauté WhatsApp</h3>
                <p>En attendant l'examen de votre candidature, vous pouvez rejoindre notre communauté publique WhatsApp pour échanger avec d'autres membres et suivre les actualités du projet.</p>
                <p><strong>Vous pouvez rejoindre immédiatement si vous ne l'avez pas encore fait.</strong></p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="{{ $whatsappCommunityLink }}" class="cta-button" target="_blank">Rejoindre la communauté WhatsApp</a>
                </div>
            </div>
            
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Notre équipe examinera votre candidature</li>
                    <li>Vous recevrez un e-mail de confirmation une fois votre candidature approuvée</li>
                    <li>En cas d'approbation, vous recevrez le lien vers le groupe WhatsApp officiel</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>Le Maroc Social 2030</strong></p>
            <p>Un projet de réflexion et de plaidoyer pour concevoir des actions concrètes</p>
            <p>et transformer le Maroc social de demain.</p>
            <p style="margin-top: 20px;">
                <a href="{{ config('app.url') }}">Visiter le site web</a> | 
                <a href="mailto:contact@maroc-social-2030.ma">Nous contacter</a>
            </p>
        </div>
    </div>
</body>
</html>

