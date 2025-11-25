<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Félicitations - Votre inscription est confirmée</title>
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
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
            background-color: rgba(27, 78, 11, 0.1);
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
            <p>Votre inscription est confirmée</p>
        </div>

        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $participant->full_name }},
            </div>

            <div class="success-box">
                <h3>🎉 Excellente nouvelle !</h3>
                <p>Nous sommes ravis de vous informer que votre inscription à l'<strong>événement de lancement</strong>
                    du livre "Le Maroc Social 2030" a été <strong>confirmée</strong>.</p>
            </div>

            <div class="content">
                <p>Votre participation à cet événement important est précieuse pour nous. Nous avons hâte de vous
                    accueillir et de partager avec vous cette étape importante de notre projet.</p>

                <p><strong>Détails de votre inscription :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li><strong>Nom :</strong> {{ $participant->full_name }}</li>
                    <li><strong>Rôle :</strong> {{ $participant->role }}</li>
                    <li><strong>Email :</strong> {{ $participant->email }}</li>
                    <li><strong>Téléphone :</strong> {{ $participant->phone }}</li>
                </ul>

                <p><strong>Informations importantes :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>
                        <strong>Lieu :</strong>
                        <a href="https://maps.app.goo.gl/2aLZCUxrDHybRBwC7" style="color: #1b4e0b; text-decoration: none;">
                            Galerie d'Art "La Tour Anis", Les Tours Végétales, Casablanca Finance City
                        </a>
                    </li>
                    <li><strong>Date :</strong> 17 décembre 2025</li>
                    <li><strong>Heure :</strong> 17h30 – 19h30</li>
                </ul>
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
