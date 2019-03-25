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
        return $this->belongsToMany('App\Shop', 'shop_categories');
    }

}
