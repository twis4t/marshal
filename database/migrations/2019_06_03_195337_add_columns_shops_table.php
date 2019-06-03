<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsShopsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shops', function(Blueprint $table) {
            $table->string('section')->nullable();
            $table->string('area')->nullable();
            $table->integer('type_id')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shops', function(Blueprint $table) {
            $table->dropColumn('section');
            $table->dropColumn('area');
            $table->dropColumn('type_id');
        });
    }
}
