<?php

use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

// Test routes (can be removed in production)
Route::get('/send-test-debug', function () {
    try {
        Mail::raw("SMTP test at " . now(), function ($m) {
            $m->to('forkanimahdi@gmail.com')->subject('SMTP Test');
        });
        return "Mail sent (no exception thrown)";
    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ], 500);
    }
});

