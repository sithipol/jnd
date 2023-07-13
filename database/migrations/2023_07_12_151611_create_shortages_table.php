<?php

use App\Models\User;
use App\Models\Shortage;
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
        Schema::create((new Shortage())->getTable(), function (Blueprint $table) {
            $table->id();
            $table->text('full_url')->comment('input url by user');
            $table->text('shortage_url')->comment('auto gen url');
            $table->bigInteger('created_by')->comment('user create');
            $table->bigInteger('updated_by')->comment('user update')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('shortages');
    }
};
