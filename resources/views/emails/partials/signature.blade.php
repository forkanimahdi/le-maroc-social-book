@php
    $siteUrl = config('app.url', 'https://ms2030.org');
    $logoUrl = rtrim($siteUrl, '/') . '/assets/logo.png';
@endphp

<div style="margin-top: 30px; text-align: center;">
    <img src="{{ $logoUrl }}" alt="Oumaima Mhijir" style="width: 140px; height: auto; display: inline-block; margin-bottom: 10px;" />
    <p style="margin: 0; font-weight: 600; color: #333; font-size: 16px;">Oumaima Mhijir</p>
    <p style="margin: 0; color: #666;">Social Entrepreneur, Serving Global Communities</p>
</div>


