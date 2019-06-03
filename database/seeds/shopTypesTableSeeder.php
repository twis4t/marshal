<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class shopTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('shop_types')->insert([
            'type' => 'Магазин',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('shop_types')->insert([
            'type' => 'СТО',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('shop_types')->insert([
            'type' => 'Страхование',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
