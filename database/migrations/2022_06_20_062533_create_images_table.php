<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('imageable_type');
            $table->unsignedBigInteger('imageable_id');
            $table->string('name')->nullable();
            $table->tinyInteger('type')->default(0)->comment('0: thumbnail, 1: avatar, 2: attachment');
            $table->string('image_url');
            $table->double('crop_x')->default(0);
            $table->double('crop_y')->default(0);
            $table->float('crop_width')->default(300);
            $table->float('crop_height')->default(300);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('images');
    }
};
