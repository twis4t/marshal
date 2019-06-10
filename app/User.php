<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'initial', 'role_id', 'shop_id', 'banned_date'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'role_id' => 'integer',
        'shop_id' => 'integer',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];

    /**
     * Passport auth
     * 
     */
    public function getAuthPassword()
    {
        return $this->password;
    }
    
    public function findForPassport($username) {
        return $this->where('name', $username)->first();
    }

    public function role(){
        return $this->belongsTo(Role::class, 'role_id');
    }

    public function shop(){
        return $this->belongsTo(Shop::class, 'shop_id');
    }

    public function requests()
    {
        return $this->hasMany(Request::class, 'user_id');
    }

    public function answers()
    {
        return $this->hasMany(Answer::class, 'user_id');
    }

    public function complaints()
    {
        return $this->hasMany(Complaint::class, 'user_id');
    }

    public function cars()
    {
        return $this->hasMany(Car::class, 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Car::class, 'user_id');
    }

    public function favoriteShops()
    {
        return $this->belongsToMany(Shop::class, 'favorite_shops')->withPivot('comment');
    }
    
    public function authLogs()
    {
        return $this->hasMany(AuthLog::class, 'email', 'email');
    }
}
