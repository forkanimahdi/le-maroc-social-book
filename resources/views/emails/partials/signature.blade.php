@php
    $siteUrl = config('app.url', 'https://ms2030.org');
    $logoUrl = rtrim($siteUrl, '/') . '/assets/logo.png';
@endphp

<div style="margin-top: 30px; text-align: center;">
    <img src="{{ $logoUrl }}" alt="Oumaima Mhijir" style="width: 140px; height: auto; display: inline-block; margin-bottom: 15px;" />
    <div style="margin-top: 15px;">
        <a href="https://www.linkedin.com/company/le-maroc-social/" target="_blank" rel="noopener noreferrer" style="color: #0077b5; text-decoration: none; margin: 0 10px; font-weight: 500;">LinkedIn</a>
        <span style="color: #999;">|</span>
        <a href="https://www.instagram.com/lemaroc_social" target="_blank" rel="noopener noreferrer" style="color: #E4405F; text-decoration: none; margin: 0 10px; font-weight: 500;">Instagram</a>
        {{-- <span style="color: #999;">|</span>
        <a href="https://web.facebook.com/oumaima.mhijir.50" target="_blank" rel="noopener noreferrer" style="color: #1877F2; text-decoration: none; margin: 0 10px; font-weight: 500;">Facebook</a> --}}
    </div>
</div>


