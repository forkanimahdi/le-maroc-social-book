<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre inscription à la cérémonie de signature et de lancement de l'ouvrage Le Maroc Social 2030 est confirmée!</title>
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
        .calendar-button {
            display: inline-block;
            background-color: #1b4e0b;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
            text-align: center;
            font-size: 16px;
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
            <p>Votre inscription à la cérémonie de signature et de lancement de l'ouvrage Le Maroc Social 2030 est confirmée!</p>
        </div>

  
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $participant->full_name }},
            </div>

            <div class="content">
                <p>En ce début d’année marqué par un élan collectif et une énergie nationale que nous ressentons tous, nous avons le plaisir de vous confirmer votre inscription à la cérémonie officielle de lancement et de signature de l’ouvrage <strong>Le Maroc Social 2030</strong>.</p>
                
                <p>Cet événement marquera le lancement public du livre Le Maroc Social 2030, écrit par <strong>Oumaima Mhijir</strong>, Entrepreneure Sociale, citoyenne engagée, et préfacé par <strong>Si Mohamed Alami Berrada</strong>, cofondateur de l’initiative Tariq Ibnou Ziyad et du Moroccan Leadership Institute.</p>
                
                <p>La cérémonie se veut un temps de réflexion et de projection collective autour des grands enjeux sociaux, humains et territoriaux du Maroc à l’horizon 2030, quatre chantiers de dignité pour insuffler un Maroc Social en 2030.</p>
            </div>

            <div class="info-section">
                <span class="info-title">Informations pratiques</span>
                <ul>
                    <li>📍 <strong>Lieu :</strong> <a href="https://maps.google.com/?q=Galerie+d'Art+La+Tour+Anis+Casablanca" style="color: #1b4e0b; text-decoration: underline;">Galerie d’Art La Tour Anis – Les Tours Végétales, Casablanca Finance City</a></li>
                    <li>📅 <strong>Date :</strong> 28 janvier 2026</li>
                    <li>🕠 <strong>Heure :</strong> 17h30 – 19h30</li>
                </ul>
                <div style="margin-top: 15px;">
                    <a href="{{ route('event-participants.calendar', $participant->id) }}" class="calendar-button">
                        📅 Ajouter à mon calendrier
                    </a>
                </div>
            </div>

            <div class="info-section">
                <span class="info-title">Vos informations</span>
                <ul>
                    <li><strong>Nom :</strong> {{ $participant->full_name }}</li>
                    <li><strong>Rôle :</strong> {{ $participant->role }}</li>
                    <li><strong>Email :</strong> <a href="mailto:{{ $participant->email }}" style="color: #555; text-decoration: none;">{{ $participant->email }}</a></li>
                    <li><strong>Téléphone :</strong> <a href="tel:{{ $participant->phone }}" style="color: #555; text-decoration: none;">{{ $participant->phone }}</a></li>
                </ul>
            </div>

            <div class="content">
                <p>Nous serons honorés de vous accueillir à cette occasion et de partager ensemble ce moment fondateur.</p>
                <p>Bien cordialement,</p>
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
