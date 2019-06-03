<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsAnswerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('answers', function(Blueprint $table) {
            $table->boolean('in_stock')->default(1);
            $table->boolean('original')->default(1);
            $table->dateTime('reserve_date')->nullable();
            $table->dropColumn('is_new');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('answers', function(Blueprint $table) {
            $table->dropColumn('in_stock');
            $table->dropColumn('original');
            $table->dropColumn('reserve_date');
            $table->boolean('is_new')->nullable();
        });
    }
}
