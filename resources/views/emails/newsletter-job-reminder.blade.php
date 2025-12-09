<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter programmée</title>
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
            background: linear-gradient(135deg, #860205 0%, #1b4e0b 100%);
            color: #ffffff;
            padding: 32px 28px;
            text-align: center;
        }

        .email-header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 700;
        }

        .email-body {
            padding: 32px;
        }

        .greeting {
            font-size: 18px;
            color: #860205;
            font-weight: 600;
            margin-bottom: 18px;
        }

        .content {
            color: #555;
            line-height: 1.7;
        }

        .highlight {
            background: rgba(204, 185, 116, 0.15);
            border-left: 4px solid #ccb974;
            padding: 16px;
            border-radius: 4px;
            margin: 24px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Newsletter programmée</h1>
        </div>

        <div class="email-body">
            <p class="greeting">Bonjour Mahdi,</p>

            <div class="content">
                <p>Je viens de lancer l'envoi de la newsletter <strong>"{{ $newsletter->subject }}"</strong> pour <strong>{{ $recipientsCount }}</strong> abonné·e·s.</p>

                <div class="highlight">
                    <p><strong>Action à réaliser :</strong><br>
                        Merci de démarrer rapidement la commande suivante afin de traiter la file d’envoi :</p>
                    <p style="font-family: monospace; font-size: 14px; margin: 0;">php artisan queue:work</p>
                </div>

                <p>Une fois le worker lancé, les messages partiront automatiquement. N’hésite pas à me tenir informée si besoin.</p>
            </div>

            @include('emails.partials.signature')
        </div>
    </div>
</body>
</html>







