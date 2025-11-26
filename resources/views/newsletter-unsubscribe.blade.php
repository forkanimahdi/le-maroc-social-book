<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Newsletter - Désabonnement</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }
        .card {
            background: #fff;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            max-width: 420px;
            text-align: center;
        }
        h1 {
            color: #860205;
            margin-bottom: 10px;
        }
        p {
            color: #555;
            line-height: 1.6;
        }
        a {
            display: inline-block;
            margin-top: 24px;
            color: #1b4e0b;
            text-decoration: none;
            font-weight: 600;
        }
        img {
            width: 120px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="card">
        <img src="{{ rtrim(config('app.url', 'https://ms2030.org'), '/') . '/assets/logo.png' }}" alt="Le Maroc Social 2030">
        <h1>Désabonnement</h1>
        <p>{{ $message }}</p>
        <a href="{{ config('app.url', 'https://ms2030.org') }}">Revenir sur ms2030.org</a>
    </div>
</body>
</html>


