<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $newsletter->subject }}</title>
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
        .cta-button {
            display: inline-block;
            padding: 12px 30px;
            background-color: var(--royal-green);
            color: white;
            text-decoration: none;
            border-radius: 6px;
            margin: 20px 0;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>Le Maroc Social 2030</h1>
        </div>
        
        <div class="email-content">
            <h2>{{ $newsletter->subject }}</h2>
            
            <div>
                {!! $newsletter->content !!}
            </div>
        </div>
        
        <div class="email-footer">
            <p><strong>Le Maroc Social 2030</strong></p>
            <p>Une initiative citoyenne pour construire ensemble un Maroc plus inclusif, solidaire et tourné vers l'avenir.</p>
            <p style="margin-top: 20px;">
                <a href="#" class="unsubscribe-link">Se désabonner</a>
            </p>
        </div>
    </div>
</body>
</html>

