<?php

use App\Http\Controllers\Admin\ContentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\GroupSignupController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\PodcastController;
use App\Http\Controllers\Admin\UserController;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');

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
    
    // Newsletter management
    Route::get('/admin/newsletter', [NewsletterController::class, 'index'])->name('admin.newsletter');
    Route::post('/admin/newsletter/send', [NewsletterController::class, 'send'])->name('admin.newsletter.send');
    Route::get('/admin/newsletter/export', [NewsletterController::class, 'exportSubscribers'])->name('admin.newsletter.export');
    
    // Content management
    Route::get('/admin/content', [ContentController::class, 'index'])->name('admin.content');
    Route::put('/admin/content/update', [ContentController::class, 'update'])->name('admin.content.update');
    Route::post('/admin/content/images', [ContentController::class, 'updateImages'])->name('admin.content.images');
    
    // Podcast management
    Route::get('/admin/podcasts', [PodcastController::class, 'index'])->name('admin.podcasts');
    Route::post('/admin/podcasts', [PodcastController::class, 'store'])->name('admin.podcasts.store');
    Route::put('/admin/podcasts/{id}', [PodcastController::class, 'update'])->name('admin.podcasts.update');
    Route::delete('/admin/podcasts/{id}', [PodcastController::class, 'destroy'])->name('admin.podcasts.destroy');
    
    // User management
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users');
    Route::post('/admin/ideas/{id}/moderate', [UserController::class, 'moderateIdea'])->name('admin.ideas.moderate');
    Route::post('/admin/groups/{id}/confirm', [UserController::class, 'confirmGroupSignup'])->name('admin.groups.confirm');
    Route::get('/admin/users/export', [UserController::class, 'exportUsers'])->name('admin.users.export');
});

// API form posts
Route::post('/api/ideas', [IdeaController::class, 'store'])->name('ideas.store');
Route::post('/api/groups', [GroupSignupController::class, 'store'])->name('groups.store');
Route::post('/api/subscribers', [SubscriberController::class, 'store'])->name('subscribers.store');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
