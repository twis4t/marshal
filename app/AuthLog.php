<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AuthLog extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'browser',
        'ip',
        'result',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'email', 'email');
    }
    

}
