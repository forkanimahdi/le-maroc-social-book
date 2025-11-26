<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résumé Exécutif - Le Maroc Social 2030</title>
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
        .attachment-info {
            background-color: #f8f9fa;
            border-left: 4px solid #1b4e0b;
            padding: 20px;
            margin: 30px 0;
            border-radius: 4px;
        }
        .attachment-info h3 {
            margin: 0 0 10px 0;
            color: #1b4e0b;
            font-size: 18px;
        }
        .attachment-info p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
        }
        .cta-button {
            display: inline-block;
            background-color: #1b4e0b;
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
        .signature {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
        }
        .signature p {
            margin: 5px 0;
            color: #555;
        }
        .signature strong {
            color: #1b4e0b;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>LE MAROC SOCIAL 2030</h1>
            <p>Résumé Exécutif</p>
        </div>
        
        <div class="email-body">
            <div class="greeting">
                Bonjour {{ $prenom }} {{ $nom }},
            </div>
            
            <div class="content">
                <p>Merci de votre intérêt pour <strong>Le Maroc Social 2030</strong>.</p>
                
                <p>Je suis heureuse de vous partager le résumé exécutif de cet ouvrage d'anticipation sociale qui porte une vision concrète pour retisser la cohésion et garantir la dignité de chaque citoyen d'ici 2030.</p>
                
                <p>Le document PDF est joint à cet e-mail. Il rassemble les idées-forces, les recommandations et les axes d'action que je défends sur le terrain.</p>
            </div>
            
            <div class="attachment-info">
                <h3>📎 Pièce jointe</h3>
                <p><strong>Fichier :</strong> Résumé Exécutif - Le Maroc Social 2030 ({{ $version === 'arabe' ? 'Arabe' : 'Français' }})</p>
                <p><strong>Format :</strong> PDF</p>
                <p>Le document est disponible en pièce jointe de cet e-mail.</p>
            </div>
            
            <div class="content">
                <p><strong>Quatre Chantiers de Dignité pour insuffler un Maroc Social en 2030 :</strong></p>
                <ul style="color: #555; line-height: 2;">
                    <li>Jeunesse et emploi : transformer les politiques publiques autour des néo-NEET</li>
                    <li>Femmes et égalité réelle : traduire les réformes juridiques en avancées concrètes</li>
                    <li>Solidarités et inclusion intergénérationnelle : retisser les liens entre classes, territoires et âges</li>
                    <li>Gouvernance et service public de confiance : bâtir un État social moderne, transparent et à l'écoute</li>
                </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="#" class="cta-button">Découvrir le livre complet</a>
            </div>

            @include('emails.partials.whatsapp-channel')
            @include('emails.partials.think-tank-invite')
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
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Vous recevez cet e-mail car vous avez demandé le résumé exécutif du livre "Le Maroc Social 2030".<br>
                Conformément à la loi 09-08 (CNDP), vos données personnelles sont protégées et utilisées uniquement dans le cadre de cette demande.
            </p>
        </div>
    </div>
</body>
</html>

