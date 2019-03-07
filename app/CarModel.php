<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarModel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'car_brand_id',
        'car_model'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'car_brand_id' => 'integer'        
    ];

    public function car_brand(){
        return $this->belongsTo(CarBrand::class, 'car_brand_id');
    }

}
