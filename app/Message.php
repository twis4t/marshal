<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'answer_id',
        'user_id',
        'message',
        'attachment'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'answer_id' => 'integer',
        'user_id' => 'integer',
    ];

    public function answer(){
        return $this->belongsTo(Answer::class, 'answer_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function answers()
    {
        return $this->hasMany(Answer::class, 'request_id');
    }

    

}
