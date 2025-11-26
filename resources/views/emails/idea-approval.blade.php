<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre idée a été approuvée</title>
    <style>
        :root {
            --royal-red: #860205;
            --royal-green: #1b4e0b;
            --gold: #ccb974;
        }
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
            background: linear-gradient(135deg, var(--royal-red) 0%, #a00306 100%);
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
            color: var(--royal-red);
            margin-bottom: 20px;
            font-weight: 600;
        }
        .content {
            color: #555;
            margin-bottom: 30px;
            line-height: 1.8;
        }
        .success-box {
            background-color: #fff5f5;
            border-left: 4px solid var(--royal-red);
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .success-box h3 {
            margin: 0 0 10px 0;
            color: var(--royal-red);
            font-size: 20px;
        }
        .success-box p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }
        .idea-box {
            background-color: #f8f9fa;
            border-left: 4px solid var(--royal-red);
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .idea-box h3 {
            margin: 0 0 10px 0;
            color: var(--royal-red);
            font-size: 18px;
        }
        .idea-box p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
            line-height: 1.6;
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
            color: var(--royal-red);
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>FÉLICITATIONS !</h1>
            <p>Votre idée a été approuvée</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $idea->full_name }},
            </div>
            
            <div class="success-box">
                <h3>🎉 Excellente nouvelle !</h3>
                <p>Je suis heureuse de vous informer que votre idée a été <strong>approuvée</strong> et publiée sur le site.</p>
            </div>
            
            <div class="content">
                <p>Merci d'avoir pris le temps de contribuer à <strong>Le Maroc Social 2030</strong>. Votre regard nourrit la réflexion collective et donne de la force à ce projet citoyen.</p>
            </div>
            
            <div class="idea-box">
                <h3>📝 Votre idée publiée :</h3>
                <p><strong>{{ $idea->full_name }}</strong> - {{ $idea->role }}</p>
                <p style="margin-top: 10px; font-style: italic;">{{ $idea->text }}</p>
            </div>
            
            <div class="content">
                <p><strong>Prochaines étapes :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Votre idée est désormais visible dans l'espace public du site.</li>
                    <li>La communauté peut la consulter et s'en inspirer.</li>
                    <li>Continuez à partager vos réflexions afin de bâtir un Maroc social et digne.</li>
                </ul>
            </div>

            @include('emails.partials.whatsapp-channel')
            @include('emails.partials.think-tank-invite')
            @include('emails.partials.signature')
        </div>
        
        <div class="footer">
            <p><strong>Oumaima Mhijir</strong></p>
            <p><a href="{{ config('app.url', 'https://ms2030.org') }}" style="color: var(--royal-red); text-decoration:none;">Visiter le site</a></p>
        </div>
    </div>
</body>
</html>

