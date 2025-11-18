<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('group_signups', function (Blueprint $table) {
            $table->string('domain_expertise', 500)->nullable()->after('domaine');
            $table->enum('status', ['pending', 'approved', 'rejected', 'declined'])->default('pending')->after('email');
            $table->string('whatsapp_community_link')->nullable()->after('status');
            $table->string('whatsapp_group_link')->nullable()->after('whatsapp_community_link');
            $table->timestamp('approved_at')->nullable()->after('whatsapp_group_link');
            $table->timestamp('rejected_at')->nullable()->after('approved_at');
        });
    }

    public function down(): void
    {
        Schema::table('group_signups', function (Blueprint $table) {
            $table->dropColumn([
                'domain_expertise',
                'status',
                'whatsapp_community_link',
                'whatsapp_group_link',
                'approved_at',
                'rejected_at'
            ]);
        });
    }
};

