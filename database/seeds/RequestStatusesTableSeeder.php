<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RequestStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('request_statuses')->insert([
            'status' => 'Новая',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('request_statuses')->insert([
            'status' => 'В работе',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('request_statuses')->insert([
            'status' => 'Резерв',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('request_statuses')->insert([
            'status' => 'Выполнена',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('request_statuses')->insert([
            'status' => 'Отмена',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
