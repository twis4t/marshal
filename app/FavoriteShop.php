<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FavoriteShop extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'shop_id',
        'user_id',
        'comment'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'shop_id' => 'integer',
        'user_id' => 'integer',
    ];

}
