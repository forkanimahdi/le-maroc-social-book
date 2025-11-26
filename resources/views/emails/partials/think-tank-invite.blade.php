@php
    $thinkTankUrl = rtrim(config('app.url', 'https://ms2030.org'), '/') . '/#groupes';
@endphp

<div style="
    margin: 30px 0;
    padding: 24px;
    border-radius: 12px;
    border: 1px dashed rgba(134, 2, 5, 0.3);
    background: rgba(134, 2, 5, 0.05);
">
    <h3 style="margin: 0 0 10px; color: #860205;">🚀 Rejoignez le Think Tank</h3>
    <p style="margin: 0 0 16px; color: #444; line-height: 1.7;">
        J'anime un espace de travail citoyen pour construire le Maroc Social 2030. Si vous souhaitez contribuer, inscrivez-vous et choisissez le chantier qui résonne avec vos engagements.
    </p>
    <div style="text-align: center;">
        <a href="{{ $thinkTankUrl }}" target="_blank" rel="noopener noreferrer" style="
            display: inline-block;
            padding: 12px 28px;
            border-radius: 999px;
            font-weight: 600;
            text-decoration: none;
            color: white;
            background: #1b4e0b;
        ">
            Accéder au Think Tank
        </a>
    </div>
</div>


