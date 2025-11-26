<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Concernant votre demande d'inscription</title>
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
            background: linear-gradient(135deg, #860205 0%, #ccb974 100%);
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
            color: #860205;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .content {
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .info-box {
            background-color: rgba(134, 2, 5, 0.08);
            border-left: 4px solid #860205;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .info-box h3 {
            margin: 0 0 10px 0;
            color: #860205;
            font-size: 18px;
        }
        .info-box p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
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
            <h1>ÉVÉNEMENT DE LANCEMENT</h1>
            <p>Le Maroc Social 2030</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $participant->full_name }},
            </div>
            
            <div class="content">
                <p>Merci d’avoir souhaité partager ce moment clé autour de « Le Maroc Social 2030 ».</p>
                
                <div class="info-box">
                    <h3>Places complètes</h3>
                    <p>Après examen attentif des candidatures, je dois malheureusement vous informer que toutes les places ont déjà été confirmées. Je sais que cette réponse peut être décevante et je vous remercie pour votre compréhension.</p>
                </div>
                
                <p><strong>Continuons le lien :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Découvrez le livre « Le Maroc Social 2030 » sur le site officiel.</li>
                    <li>Rejoignez les groupes de travail pour participer aux réflexions.</li>
                    <li>Suivez la newsletter pour être informé·e des prochains rendez-vous.</li>
                    <li>Gardez un œil sur nos réseaux pour les futures rencontres.</li>
                </ul>
                
                <p>J’espère pouvoir vous accueillir lors d’un prochain événement.</p>
            </div>

            @include('emails.partials.whatsapp-channel')
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

