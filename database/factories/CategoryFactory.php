<?php

use App\Category;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories Category
|--------------------------------------------------------------------------
|
*/

$factory->define(Category::class, function (Faker $faker) {
    return [
        'category' => $faker->sentence($nbWords = rand(2, 3), $variableNbWords = true),
    ];
});
