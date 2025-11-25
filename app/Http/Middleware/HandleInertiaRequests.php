<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'links' => [
                'whatsappChannel' => config('app.whatsapp_channel'),
                'businessWhatsapp' => config('app.business_whatsapp'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * Handle Inertia errors
     */
    public function handle(Request $request, \Closure $next)
    {
        $response = parent::handle($request, $next);
        
        // If there's an error and it's not already an Inertia response, 
        // redirect to the previous page with error message
        if ($response->getStatusCode() >= 400 && $response->getStatusCode() < 500) {
            if ($request->header('X-Inertia')) {
                return $response;
            }
            
            return redirect()->back()->with('error', 'Une erreur est survenue.');
        }
        
        return $response;
    }
}
