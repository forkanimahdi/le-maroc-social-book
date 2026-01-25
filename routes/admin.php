<?php

use App\Http\Controllers\Admin\ContentController;
use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\EventParticipantController as AdminEventParticipantController;
use App\Http\Controllers\Admin\NewsletterController;
use App\Http\Controllers\Admin\PodcastController;
use App\Http\Controllers\Admin\ThinkTankController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\IdeaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])->group(function () {
    // Dashboard
    Route::get('/admin', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/admin/ideas', [DashboardController::class, 'ideas'])->name('admin.ideas');

    // Ideas management
    Route::post('/admin/ideas/{idea}/approve', [IdeaController::class, 'moderate'])->name('admin.ideas.approve');
    Route::post('/admin/ideas/{idea}/reject', [IdeaController::class, 'reject'])->name('admin.ideas.reject');
    Route::delete('/admin/ideas/{idea}', [IdeaController::class, 'destroy'])->name('admin.ideas.destroy');
    Route::post('/admin/ideas/{id}/moderate', [UserController::class, 'moderateIdea'])->name('admin.ideas.moderate');

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
    Route::get('/admin/users/export', [UserController::class, 'exportUsers'])->name('admin.users.export');
    Route::post('/admin/groups/{id}/confirm', [UserController::class, 'confirmGroupSignup'])->name('admin.groups.confirm');

    // Think Tank management
    Route::get('/admin/think-tank', [ThinkTankController::class, 'index'])->name('admin.think-tank');
    Route::post('/admin/think-tank/{id}/approve', [ThinkTankController::class, 'approve'])->name('admin.think-tank.approve');
    Route::post('/admin/think-tank/{id}/reject', [ThinkTankController::class, 'reject'])->name('admin.think-tank.reject');
    Route::delete('/admin/think-tank/{id}', [ThinkTankController::class, 'destroy'])->name('admin.think-tank.destroy');

    // Event Participants management
    Route::get('/admin/event-participants', [AdminEventParticipantController::class, 'index'])->name('admin.event-participants');
    Route::get('/admin/event-participants/export', [AdminEventParticipantController::class, 'export'])->name('admin.event-participants.export');
    Route::post('/admin/event-participants/{id}/approve', [AdminEventParticipantController::class, 'approve'])->name('admin.event-participants.approve');
    Route::post('/admin/event-participants/{id}/reject', [AdminEventParticipantController::class, 'reject'])->name('admin.event-participants.reject');
    Route::delete('/admin/event-participants/{id}', [AdminEventParticipantController::class, 'destroy'])->name('admin.event-participants.destroy');

    // Contact messages
    Route::get('/admin/messages', [AdminContactMessageController::class, 'index'])->name('admin.messages');
    Route::post('/admin/messages/{message}/reply', [AdminContactMessageController::class, 'reply'])->name('admin.messages.reply');

    // Communication
    Route::get('/admin/communication', [\App\Http\Controllers\Admin\CommunicationController::class, 'index'])->name('admin.communication');
    Route::post('/admin/communication/send', [\App\Http\Controllers\Admin\CommunicationController::class, 'send'])->name('admin.communication.send');
});

