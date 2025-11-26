<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation d'inscription - Événement de lancement</title>
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
            background: linear-gradient(135deg, #860205 0%, #1b4e0b 50%, #ccb974 100%);
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
            background: linear-gradient(135deg, rgba(134, 2, 5, 0.08) 0%, rgba(27, 78, 11, 0.08) 50%, rgba(204, 185, 116, 0.08) 100%);
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
        .cta-button {
            display: inline-block;
            background-color: #860205;
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
        .highlight {
            color: #1b4e0b;
            font-weight: 600;
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
                <p>Merci pour votre intérêt pour l'<strong>événement de lancement</strong> de « Le Maroc Social 2030 ».</p>
                
                <p>Je confirme que j'ai bien reçu votre demande d'inscription. Je prends le temps d'étudier chaque candidature avec attention pour garantir une expérience fidèle à l'esprit de l'ouvrage.</p>
                
                <div class="info-box">
                    <h3>📋 Vos informations</h3>
                    <p><strong>Nom :</strong> {{ $participant->full_name }}</p>
                    <p><strong>Rôle :</strong> {{ $participant->role }}</p>
                    <p><strong>Email :</strong> {{ $participant->email }}</p>
                    <p><strong>Téléphone :</strong> {{ $participant->phone }}</p>
                </div>
            </div>
            
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <p>Je reviendrai vers vous dans les meilleurs délais pour vous confirmer votre participation. En attendant, vous pouvez explorer l'univers du livre et suivre les actualités du projet via nos canaux officiels.</p>
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

