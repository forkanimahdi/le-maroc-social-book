<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue dans la newsletter</title>
    <style>
        :root {
            --royal-red: #860205;
            --royal-green: #1b4e0b;
            --gold: #ccb974;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f5f5f5;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        .email-header {
            background: linear-gradient(135deg, var(--royal-red), var(--royal-green));
            padding: 40px 20px;
            text-align: center;
            color: white;
        }
        .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .email-content {
            padding: 40px 30px;
            color: #333333;
        }
        .email-content h2 {
            color: var(--royal-red);
            margin-top: 0;
            font-size: 24px;
        }
        .email-content p {
            margin: 16px 0;
            font-size: 16px;
            line-height: 1.8;
        }
        .email-footer {
            background-color: #f9f9f9;
            padding: 30px;
            text-align: center;
            border-top: 2px solid var(--royal-green);
        }
        .email-footer p {
            margin: 8px 0;
            font-size: 14px;
            color: #666666;
        }
        .unsubscribe-link {
            color: var(--royal-red);
            text-decoration: none;
            font-size: 12px;
        }
        .success-box {
            background-color: #f0f9f0;
            border-left: 4px solid var(--royal-green);
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .success-box p {
            margin: 0;
            color: var(--royal-green);
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Le Maroc Social 2030</h1>
        </div>
        
        <div class="email-content">
            <h2>Bienvenue {{ $subscriber->nom }} !</h2>
            
            <div class="success-box">
                <p>✓ Votre abonnement à la newsletter a été confirmé avec succès</p>
            </div>
            
            <p>Je suis ravie de vous compter parmi les personnes qui suivent l'aventure du <strong>Maroc Social 2030</strong>.</p>
            
            <p>Vous recevrez désormais régulièrement :</p>
            <ul style="line-height: 2;">
                <li>Les actualités et les avancées de nos projets</li>
                <li>Les réflexions et analyses sur les enjeux sociaux du Maroc</li>
                <li>Les invitations aux événements et aux groupes de travail</li>
                <li>Les contenus exclusifs et les ressources partagées</li>
            </ul>

            <p>Ensemble, nous construisons une vision collective pour un Maroc plus solidaire et inclusif.</p>

            <p>Merci de faire partie de cette communauté engagée.</p>

            @include('emails.partials.signature')
        </div>
        
        <div class="email-footer">
            <p><strong>Oumaima Mhijir</strong></p>
            <p><a href="{{ config('app.url', 'https://ms2030.org') }}" style="color: var(--royal-green); text-decoration:none;">Visiter ms2030.org</a></p>
            <p style="margin-top: 20px;">
                <a href="{{ route('newsletter.unsubscribe', $subscriber->unsubscribe_token) }}" class="unsubscribe-link">Se désabonner</a>
            </p>
        </div>
    </div>
</body>
</html>



