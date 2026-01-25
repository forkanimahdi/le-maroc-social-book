<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Home page
Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Load route files
require __DIR__ . '/public.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/test.php';

// Fallback route for 404 - must be last
Route::fallback(function () {
    return Inertia::render('Error404');
});
