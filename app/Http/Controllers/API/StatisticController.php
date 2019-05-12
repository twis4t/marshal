<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

/**
 * @group Car
 *
 * API методы для работы с автомобилями пользователя
 */
class StatisticController extends Controller
{
    /**
     * Получение статистики за период
     * @param $model model
     * @param $days integer
     * @return Array
     */
    public function RangeStat($model, $days)
    {
        $dates = collect();
        foreach( range( -$days, 0 ) AS $i ) {
            $date = Carbon::now()->addDays( $i )->format( 'Y-m-d' );
            $dates->put( $date, 0);
        }
        $requests = $model::where( 'created_at', '>=', $dates->keys()->first() )
                     ->groupBy( 'date' )
                     ->orderBy( 'date' )
                     ->get( [
                         DB::raw( 'DATE( created_at ) as date' ),
                         DB::raw( 'COUNT( * ) as "count"' )
                     ] )
                     ->pluck( 'count', 'date' );
        
        $dates = $dates->merge( $requests );        
        return $dates;
    }

    /**
     * Получение количества записей
     * @param $model model
     * @return Array
     */
    public function TotalRows($model)
    {
       $result = $model::get( [DB::raw( 'COUNT( * ) as "count"' )] )->first();      
       return $result['count']; 
    }


     /**
     * Получение общей статистики ресурса
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $days = 14;

        $requestsStat['dates'] = $this->RangeStat(app("App\\Request"), $days);
        $requestsStat['total'] = $this->TotalRows(app("App\\Request"));

        $usersStat['dates'] = $this->RangeStat(app("App\\User"), $days);
        $usersStat['total'] = $this->TotalRows(app("App\\User"));

        $messagesStat['dates']  = $this->RangeStat(app("App\\Message"), $days);
        $messagesStat['total'] = $this->TotalRows(app("App\\Message"));

        $answersStat['dates']  = $this->RangeStat(app("App\\Answer"), $days);
        $answersStat['total'] = $this->TotalRows(app("App\\Answer"));

        return compact( 'requestsStat', 'usersStat', 'messagesStat', 'answersStat' );
    }

   
}
