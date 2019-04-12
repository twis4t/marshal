<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarBrand extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'car_brand',
    ];

    public function car_models()
    {
        return $this->hasMany(CarModel::class, 'car_brand_id');
    }

}
