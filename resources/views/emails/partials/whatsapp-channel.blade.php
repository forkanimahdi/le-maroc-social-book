@php
    $channelLink = $channelLink ?? config('app.whatsapp_channel');
@endphp

@if($channelLink)
    <div style="
        background-color: #f0f7ed;
        border-left: 4px solid #1b4e0b;
        padding: 20px;
        margin: 30px 0;
        border-radius: 6px;
    ">
        <h3 style="margin: 0 0 10px; color: #1b4e0b;">
            📢 Canal WhatsApp officiel
        </h3>
        <p style="margin: 0; color: #555; line-height: 1.6;">
            Rejoignez notre canal pour recevoir les annonces officielles, invitations et mises à jour en temps réel.
        </p>
        <div style="text-align: center; margin-top: 16px;">
            <a
                href="{{ $channelLink }}"
                target="_blank"
                rel="noopener noreferrer"
                style="
                    display: inline-block;
                    background-color: #1b4e0b;
                    color: #ffffff;
                    padding: 12px 28px;
                    text-decoration: none;
                    border-radius: 999px;
                    font-weight: 600;
                "
            >
                Ouvrir le canal WhatsApp
            </a>
        </div>
    </div>
@endif

