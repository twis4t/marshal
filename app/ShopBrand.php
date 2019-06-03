<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopBrand extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id',
        'car_brand_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'shop_id' => 'integer',
        'car_brand_id' => 'integer',
    ];
}
