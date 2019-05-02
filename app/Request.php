<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'car_id',
        'category_id',
        'shop_id',
        'status_id',
        'text',
        'vin'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id' => 'integer',
        'car_id' => 'integer',
        'category_id' => 'integer',
        'shop_id' => 'integer',
        'status_id' => 'integer'
    ];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function car(){
        return $this->belongsTo(Car::class, 'car_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shop(){
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function status(){
        return $this->belongsTo(RequestStatus::class, 'status_id');
    }

    public function answers()
    {
        return $this->hasMany(Answer::class, 'request_id');
    }

}
