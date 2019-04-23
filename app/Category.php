<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'category',
    ];

    public function shops()
    {
        return $this->belongsToMany(Shop::class, 'shop_categories');
    }

}
