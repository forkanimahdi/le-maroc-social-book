<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('group_signups', function (Blueprint $table) {
            $table->id();
            $table->string('group');
            $table->string('nom');
            $table->string('email');
            $table->string('domaine')->nullable();
            $table->text('motivation')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('group_signups');
    }
};


