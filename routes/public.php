<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\EventParticipantController;
use App\Http\Controllers\GroupSignupController;
use App\Http\Controllers\IdeaController;
use App\Http\Controllers\SubscriberController;
use Illuminate\Support\Facades\Route;

// Public form submissions
Route::post('/ideas', [IdeaController::class, 'store'])->name('ideas.store');
Route::put('/ideas/{idea}', [IdeaController::class, 'update'])->name('ideas.update');
Route::post('/groups', [GroupSignupController::class, 'store'])->name('groups.store');
Route::post('/subscribers', [SubscriberController::class, 'store'])->name('subscribers.store');
Route::post('/book/executive-summary', [BookController::class, 'sendExecutiveSummary'])->name('book.executive-summary');
Route::post('/event-participants', [EventParticipantController::class, 'store'])->name('event-participants.store');
Route::get('/event-participants/{id}/calendar', [EventParticipantController::class, 'downloadCalendar'])->name('event-participants.calendar');
Route::post('/contact', [ContactMessageController::class, 'store'])->name('contact.store');
Route::get('/newsletter/unsubscribe/{token}', [SubscriberController::class, 'unsubscribe'])->name('newsletter.unsubscribe');

