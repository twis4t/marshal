<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ClientApp extends Model
{
    public $successStatus = 200;

    /**
     * Получение информации о приложении
     *
     * @return \Illuminate\Http\Response
     */

    public static function getInfo($appName)
    {
        $result = DB::table('oauth_clients')->select('id', 'secret')->where('name', '=', $appName)->first();
        return $result;
    }
}
