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
                <p>Merci de votre intérêt pour participer à l'<strong>événement de lancement</strong> du livre "Le Maroc Social 2030".</p>
                
                <p>Nous avons bien reçu votre demande d'inscription et nous vous en remercions chaleureusement.</p>
                
                <div class="info-box">
                    <h3>📋 Détails de votre inscription</h3>
                    <p><strong>Nom :</strong> {{ $participant->full_name }}</p>
                    <p><strong>Rôle :</strong> {{ $participant->role }}</p>
                    <p><strong>Email :</strong> {{ $participant->email }}</p>
                    <p><strong>Téléphone :</strong> {{ $participant->phone }}</p>
                </div>
            </div>
            
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <p>Votre demande est actuellement en cours d'examen. Nous examinons chaque demande avec attention et nous vous recontacterons <span class="highlight">dès que possible</span> pour vous confirmer votre participation.</p>
                
                <p>En attendant, nous vous invitons à découvrir le livre et à rejoindre notre communauté pour rester informé de toutes nos actualités.</p>
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

