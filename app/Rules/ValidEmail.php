<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidEmail implements Rule
{
    private $tempEmailDomains = [
        '10minutemail.com',
        'tempmail.com',
        'guerrillamail.com',
        'mailinator.com',
        'throwaway.email',
        'temp-mail.org',
        'getnada.com',
        'mohmal.com',
        'fakeinbox.com',
        'trashmail.com',
        'maildrop.cc',
        'yopmail.com',
        'sharklasers.com',
        'grr.la',
        'guerrillamailblock.com',
        'pokemail.net',
        'spam4.me',
        'bccto.me',
        'chammy.info',
        'dispostable.com',
        'meltmail.com',
        'emailondeck.com',
        'spambox.us',
        'mintemail.com',
        'moburl.com',
        'mytemp.email',
        'tempail.com',
        'tempinbox.co.uk',
        'tempmailo.com',
        'tmpmail.org',
    ];

    public function passes($attribute, $value)
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return false;
        }

        $domain = substr(strrchr($value, "@"), 1);
        $domain = strtolower($domain);

        // Check if it's a temp email domain
        if (in_array($domain, $this->tempEmailDomains)) {
            return false;
        }

        // Check for common temp email patterns
        $tempPatterns = [
            '/^temp/i',
            '/^tmp/i',
            '/^test/i',
            '/^fake/i',
            '/^spam/i',
            '/^trash/i',
            '/^throwaway/i',
            '/^disposable/i',
        ];

        foreach ($tempPatterns as $pattern) {
            if (preg_match($pattern, $domain)) {
                return false;
            }
        }

        // Check MX records to ensure domain exists
        if (!checkdnsrr($domain, 'MX')) {
            return false;
        }

        return true;
    }

    public function message()
    {
        return 'L\'adresse e-mail fournie n\'est pas valide ou est une adresse temporaire. Veuillez utiliser une adresse e-mail valide.';
    }
}

