<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Réponse à votre message</title>
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
            padding: 40px 30px;
            text-align: center;
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

        .quote-box {
            background-color: rgba(204, 185, 116, 0.1);
            border-left: 4px solid #ccb974;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
            font-style: italic;
            color: #444;
        }

        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }

        .footer p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }

        .signature-logo {
            width: 120px;
            margin: 20px auto 10px;
            display: block;
        }

        .signature-text {
            text-align: center;
            color: #333;
            font-weight: 600;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Merci pour votre message</h1>
        </div>

        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $contactMessage->full_name }},
            </div>

            <div class="content">
                <p>Je vous remercie pour votre message et pour l'intérêt sincère que vous portez à mon travail autour de « Le Maroc Social 2030 ».</p>
                <p>Voici ma réponse :</p>

                <div class="quote-box">
                    {!! nl2br(e($contactMessage->reply)) !!}
                </div>

                <p>Je reste à votre disposition pour poursuivre cet échange et construire ensemble des solutions concrètes pour notre pays.</p>
            </div>

            @include('emails.partials.signature')
        </div>

        <div class="footer">
            <p><strong>Oumaima Mhijir</strong></p>
            <p>Le Maroc Social 2030</p>
            <p><a href="{{ config('app.url', 'https://ms2030.org') }}" style="color:#1b4e0b; text-decoration:none;">Visiter le site</a></p>
        </div>
    </div>
</body>
</html>


