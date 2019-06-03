<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShopType extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type',
    ];

    public function shops()
    {
        return $this->hasMany(Shop::class, 'type_id');
    }
}
