<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
        'address',
        'phone',
        'comment',
        'archive_date'
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'shop_categories');
    }

    public function inFavorites()
    {
        return $this->belongsToMany(User::class, 'favorite_shops')->withPivot('comment');
    }

}
