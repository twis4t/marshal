<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'request_id',
        'status_id',
        'shop_id',
        'user_id',
        'price',
        'is_new',
        'description'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'request_id' => 'integer',
        'status_id' => 'integer',
        'shop_id' => 'integer',
        'user_id' => 'integer',
        'is_new' => 'boolean'
    ];

    public function messages(){
        return $this->hasMany(Message::class);
    }

    public function request(){
        return $this->belongsTo(Request::class, 'request_id');
    }

    public function status(){
        return $this->hasOne(Status::class, 'status_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }



}
