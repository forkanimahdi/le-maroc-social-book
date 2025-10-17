<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\GroupSignupController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\Admin\DashboardController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Navigation ancrée sur la page d'accueil (sections sur une seule page)

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Admin
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::post('/admin/ideas/{idea}/approve', [IdeaController::class, 'moderate'])->name('admin.ideas.approve');
});

// API form posts
Route::post('/api/ideas', [IdeaController::class, 'store'])->name('ideas.store');
Route::post('/api/groups', [GroupSignupController::class, 'store'])->name('groups.store');
Route::post('/api/subscribers', [SubscriberController::class, 'store'])->name('subscribers.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
