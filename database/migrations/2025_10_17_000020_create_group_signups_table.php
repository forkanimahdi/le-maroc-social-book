<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('group_signups', function (Blueprint $table) {
            $table->id();

            $table->string('nom');
            $table->string('group');
            $table->string('email');
            $table->string('domain_expertise', 500)->nullable();
            $table->string('domaine')->nullable();
            $table->text('motivation')->nullable();

            $table->enum('status', ['pending', 'approved', 'rejected'])->default('pending');
            $table->string('whatsapp_community_link')->nullable();
            $table->string('whatsapp_group_link')->nullable();
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_signups');
    }
};
