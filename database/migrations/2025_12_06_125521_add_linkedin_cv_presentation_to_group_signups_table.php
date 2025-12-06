<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('group_signups', function (Blueprint $table) {
            $table->string('linkedin_url')->nullable()->after('email');
            $table->string('cv_path')->nullable()->after('linkedin_url');
            $table->string('presentation', 250)->after('cv_path');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('group_signups', function (Blueprint $table) {
            $table->dropColumn(['linkedin_url', 'cv_path', 'presentation']);
        });
    }
};
