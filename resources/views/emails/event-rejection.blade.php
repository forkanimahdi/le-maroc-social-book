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
                <p>Nous vous remercions de votre intérêt pour participer à l'événement de lancement du livre "Le Maroc Social 2030".</p>
                
                <div class="info-box">
                    <h3>Malheureusement, les places sont complètes</h3>
                    <p>Après examen de votre demande, nous sommes au regret de vous informer que nous ne pouvons pas confirmer votre inscription à cet événement, car <strong>toutes les places disponibles ont été attribuées</strong>.</p>
                </div>
                
                <p>Nous comprenons votre déception et nous vous remercions sincèrement de votre intérêt pour notre projet.</p>
                
                <p><strong>Nous vous invitons à :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Découvrir le livre "Le Maroc Social 2030" sur notre site web</li>
                    <li>Rejoindre notre communauté et nos groupes de travail</li>
                    <li>Suivre nos actualités via notre newsletter</li>
                    <li>Participer à nos prochains événements</li>
                </ul>
                
                <p>Nous espérons avoir l'occasion de vous accueillir lors d'un prochain événement.</p>
            </div>

            @include('emails.partials.whatsapp-channel')
        </div>
        
        <div class="footer">
            <p><strong>Le Maroc Social 2030</strong></p>
            <p>Un projet de réflexion et de plaidoyer pour concevoir des actions concrètes</p>
            <p>et transformer le Maroc social de demain.</p>
            <p style="margin-top: 20px;">
                <a href="{{ config('app.url') }}">Visiter le site web</a> | 
                <a href="mailto:author@ms2030.org">Nous contacter</a>
            </p>
        </div>
    </div>
</body>
</html>

