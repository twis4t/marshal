<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'request_id',
        'user_id',
        'comment',
        'finished',
    ];

     /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'request_id' => 'integer',
        'user_id' => 'integer',
    ];

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
    }
}
