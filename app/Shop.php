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
        'archive_date',
        'section',
        'area',
        'type_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'type_id' => 'integer',
    ];


    public function categories()
    {
        return $this->belongsToMany(Category::class, 'shop_categories');
    }

    public function carBrands()
    {
        return $this->belongsToMany(CarBrand::class, 'shop_brands');
    }

    public function inFavorites()
    {
        return $this->belongsToMany(User::class, 'favorite_shops')->withPivot('comment');
    }

    public function type(){
        return $this->belongsTo(ShopType::class, 'type_id');
    }

}
