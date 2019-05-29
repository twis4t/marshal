<?php

namespace App\Http\Controllers\API;

use App\Request as RequestModel;
use App\Complaint;
use App\RequestStatus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Validator;

/**
 * @group Request
 *
 * API методы для работы с заявками
 */
class RequestController extends Controller
{
    /**
     * Получение списка заявок
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {      
        $requestsQuery = RequestModel::query();
        if (isset($request->users)){
            $requestsQuery = $requestsQuery->whereIn('user_id', $request->users);
        }
        if (isset($request->shops)){
            $requestsQuery = $requestsQuery->whereIn('shop_id', $request->shops);
        }
        if (isset($request->statuses)){
            $requestsQuery = $requestsQuery->whereIn('status_id', $request->statuses);
        }
        if (isset($request->dateFrom)){
            $requestsQuery = $requestsQuery->whereDate('created_at', '>=', $request->dateFrom);
        }
        if (isset($request->dateTo)){
            $requestsQuery = $requestsQuery->whereDate('created_at', '<=', $request->dateTo);
        }
        return $requestsQuery->with(['user:id,name', 'status:id,status', 'shop:id,name'])->withCount('answers')->get();
    }

    /**
     * Получение списка статусов заявок
     *
     * @return \Illuminate\Http\Response
     */
    public function requestStatuses()
    {
        return RequestStatus::all();
    }


    /**
     * Получение списка заявок пользователя
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function userRequests(Request $request)
    {
        $requestData = $request->all();       
        $user = Auth::user();
        $user_id = $request['id'] ?? $user->id;
        return RequestModel::where('user_id', $user_id)->withCount('answers')->get();
    }

    /**
     * Создание новой заявки
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = RequestModel::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по заявке и списка ответов
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();
        $req = RequestModel::where('id', $id)->with([
            'answers.user:id,name',
            'answers.shop:id,name',
            'user:id,name',
            'status:id,status',
            'car.car_brand:id,car_brand',
            'car.car_model:id,car_model',
            'category:id,category'
        ])->withCount('answers')->get()->first();

        if (!isset($req)) return response()->json(['error'=>'Request not found'], 404);

        // для продавцов оставляем только ответы магазина
        if ($user->role_id === 3){
            $answers = []; 
            foreach ($req->answers as $answer){
                if ($answer->shop_id === $user->shop_id) $answers[] = $answer;
            }
            $req->answers = collect($answers);          
        }
        
        return [$req];
    }

    /**
     * Изменение заявки
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = RequestModel::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление заявки
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = RequestModel::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }

    /**
     * Пожаловаться на заявку
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function complain(Request $request)
    {
        $user = Auth::user();
        $validator = Validator::make($request->all(), [
            'request_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }

        $req = RequestModel::find($request->request_id);
        if (!isset($req)){
            return response()->json(['error'=>'Request does not exist'], 404);       
        }

        $requestData = $request->all();
        $requestData['user_id'] = $user->id;
        $result = Complaint::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Обработать заявку
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function finishComplaint($id)
    {        
        $complaint = Complaint::find($id);
        if (!isset($complaint)){
            return response()->json(['error'=>'Complaint does not exist'], 404);       
        }
        $complaint->finished = Carbon::now();
        $result = $complaint->save();
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получить жалобы
     *
     * @return \Illuminate\Http\Response
     */
    public function complaints()
    {        
        $result = Complaint::with('user:id,name')->orderBy( 'created_at', 'desc' )->get();       
        return $result;
    }
}
