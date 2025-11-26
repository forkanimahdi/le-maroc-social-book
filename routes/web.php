<?php

use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\GroupSignupController;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\PodcastController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\EventParticipantController;

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
    Route::get('/admin/ideas', [DashboardController::class, 'ideas'])->name('admin.ideas');
    Route::post('/admin/ideas/{idea}/approve', [IdeaController::class, 'moderate'])->name('admin.ideas.approve');
    Route::post('/admin/ideas/{idea}/reject', [IdeaController::class, 'reject'])->name('admin.ideas.reject');
    Route::delete('/admin/ideas/{idea}', [IdeaController::class, 'destroy'])->name('admin.ideas.destroy');
    
    // Newsletter management
    Route::get('/admin/newsletter', [NewsletterController::class, 'index'])->name('admin.newsletter');
    Route::post('/admin/newsletter/send', [NewsletterController::class, 'send'])->name('admin.newsletter.send');
    Route::get('/admin/newsletter/export', [NewsletterController::class, 'exportSubscribers'])->name('admin.newsletter.export');
    Route::post('/admin/newsletter/subscribers/{subscriber}/toggle', [NewsletterController::class, 'toggleSubscriberStatus'])->name('admin.newsletter.subscribers.toggle');
    
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
    
    // Think Tank management
    Route::get('/admin/think-tank', [\App\Http\Controllers\Admin\ThinkTankController::class, 'index'])->name('admin.think-tank');
    Route::post('/admin/think-tank/{id}/approve', [\App\Http\Controllers\Admin\ThinkTankController::class, 'approve'])->name('admin.think-tank.approve');
    Route::post('/admin/think-tank/{id}/reject', [\App\Http\Controllers\Admin\ThinkTankController::class, 'reject'])->name('admin.think-tank.reject');
    Route::delete('/admin/think-tank/{id}', [\App\Http\Controllers\Admin\ThinkTankController::class, 'destroy'])->name('admin.think-tank.destroy');
    
    // Event Participants management
    Route::get('/admin/event-participants', [\App\Http\Controllers\Admin\EventParticipantController::class, 'index'])->name('admin.event-participants');
    Route::post('/admin/event-participants/{id}/approve', [\App\Http\Controllers\Admin\EventParticipantController::class, 'approve'])->name('admin.event-participants.approve');
    Route::post('/admin/event-participants/{id}/reject', [\App\Http\Controllers\Admin\EventParticipantController::class, 'reject'])->name('admin.event-participants.reject');
    Route::delete('/admin/event-participants/{id}', [\App\Http\Controllers\Admin\EventParticipantController::class, 'destroy'])->name('admin.event-participants.destroy');

    // Contact messages
    Route::get('/admin/messages', [AdminContactMessageController::class, 'index'])->name('admin.messages');
    Route::post('/admin/messages/{message}/reply', [AdminContactMessageController::class, 'reply'])->name('admin.messages.reply');
});

// Form posts
Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
Route::post('/groups', [GroupSignupController::class, 'store'])->name('groups.store');
Route::post('/subscribers', [SubscriberController::class, 'store'])->name('subscribers.store');
Route::post('/book/executive-summary', [BookController::class, 'sendExecutiveSummary'])->name('book.executive-summary');
Route::post('/event-participants', [EventParticipantController::class, 'store'])->name('event-participants.store');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');
Route::get('/newsletter/unsubscribe/{token}', [SubscriberController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Fallback route for 404 - must be last
Route::fallback(function () {
    return \Inertia\Inertia::render('Error404');
});
