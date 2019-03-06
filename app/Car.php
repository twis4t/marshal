<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'car_brand_id',
        'car_model_id',
        'year',
        'vin',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
        'car_brand_id' => 'integer',
        'car_model_id' => 'integer'
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function car_brand(){
        return $this->hasOne(CarBrand::class, 'car_brand_id');
    }

    public function car_model(){
        return $this->hasOne(CarModel::class, 'car_model_id');
    }

}
