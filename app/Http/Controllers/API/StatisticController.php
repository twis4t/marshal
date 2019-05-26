<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Category;
use App\RequestStatus;
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
     * Получение количества записей по условию
     * @param $model model
     * @param $filterColumn
     * @param $value
     * @return Array
     */
    public function FilteredCountRows($model, $filterColumn, $value)
    {
       $result = $model::where($filterColumn, $value)->get( [DB::raw( 'COUNT( * ) as "count"' )] )->first();      
       return $result['count']; 
    }

    
    /**
     * Получение количества заявок по категориям
     * @return Array
     */
    public function RequestCategoriesStat()
    {
        $result = Category::join('requests', 'category_id', '=', 'categories.id')
            ->groupBy('categories.category')
            ->select('categories.category', DB::raw('count(1) AS count'))
            ->get();
        return $result; 
    }

    /**
     * Получение количества заявок по статусам
     * @return Array
     */
    public function RequestStatusCount()
    {
        $result = RequestStatus::join('requests', 'status_id', '=', 'request_statuses.id')
            ->groupBy('request_statuses.id')
            ->select('request_statuses.status', 'request_statuses.id', DB::raw('count(1) AS count'))
            ->get();
        return $result; 
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

        $carsStat['total'] = $this->TotalRows(app("App\\Car"));

        $complaintsStat['total'] = $this->TotalRows(app("App\\Complaint"));
        $complaintsStat['open'] = $this->FilteredCountRows(app("App\\Complaint"), 'finished', null);

        return compact( 'requestsStat', 'usersStat', 'messagesStat', 'answersStat', 'carsStat', 'complaintsStat' );
    }

   
}
