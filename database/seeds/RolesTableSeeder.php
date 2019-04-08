<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            'role' => 'Администратор',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('roles')->insert([
            'role' => 'Покупатель',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('roles')->insert([
            'role' => 'Продавец',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
