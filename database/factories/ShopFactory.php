<?php

use App\Shop;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories Shop
|--------------------------------------------------------------------------
|
*/

$factory->define(Shop::class, function (Faker $faker) {
    return [
        'name' => $faker->company,
        'description' => $faker->companySuffix,
        'address' => $faker->streetAddress,
        'phone' => $faker->phoneNumber,
        'comment' => $faker->domainName,
    ];
});
