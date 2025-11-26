<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('subscribers', function (Blueprint $table) {
            $table->string('unsubscribe_token')->nullable()->after('email');
            $table->timestamp('unsubscribed_at')->nullable()->after('unsubscribe_token');
        });

        DB::table('subscribers')->orderBy('id')->chunk(100, function ($subscribers) {
            foreach ($subscribers as $subscriber) {
                DB::table('subscribers')
                    ->where('id', $subscriber->id)
                    ->update([
                        'unsubscribe_token' => Str::random(40),
                    ]);
            }
        });
    }

    public function down(): void
    {
        Schema::table('subscribers', function (Blueprint $table) {
            $table->dropColumn(['unsubscribe_token', 'unsubscribed_at']);
        });
    }
};


