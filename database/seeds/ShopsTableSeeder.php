<?php

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class ShopsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {     
        factory(App\Shop::class, 5)->create()->each(function($s) {
            $s->categories()->save(factory(App\Category::class)->make());
        }); 
    }
}
