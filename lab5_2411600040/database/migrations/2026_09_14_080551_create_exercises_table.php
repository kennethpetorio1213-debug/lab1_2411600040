<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique();
            $table->text('description')->nullable();
            $table->enum('category', ['Cardio', 'Strength', 'Core', 'Flexibility']);
            $table->integer('sessions_completed')->default(0);
            $table->integer('weekly_goal')->default(1);
            $table->decimal('calories_per_session', 8, 2)->default(0);
            $table->string('instructor')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};