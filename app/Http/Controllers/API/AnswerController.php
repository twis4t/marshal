<?php

namespace App\Http\Controllers\API;

use App\Answer;
use App\Request as RequestModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

/**
 * @group Answer
 *
 * API методы для работы с ответами (откликами) на заявки
 */
class AnswerController extends Controller
{
    /**
     * Получение списка ответов
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $answersQuery = Answer::query();
        $user = Auth::user();
        if (isset(request()->user_id)){
            $answersQuery = $answersQuery->where('user_id', request()->user_id);
        }
        if (isset(request()->shop_id)){
            $answersQuery = $answersQuery->where('shop_id', request()->shop_id);
        }
        if (isset(request()->all)){
            return $answersQuery->with(['user:id,name'])->get();
        }
        // for mobile (or fix req in the app)
        $answers = $answersQuery->whereHas('request', function($query) use ($user){
	        $query->where('user_id', $user->id);
	    })->get();
	    
	    foreach ($answers as $key => $answer) {
	    	$answers[$key]['reserve_date'] = (time()-(60*60*24)) < strtotime($answer['reserve_date']) ? $answer['reserve_date'] : null;
	    	$answers[$key]['reserve_date_passed'] = (time()-(60*60*24)) < strtotime($answer['reserve_date']) ? 'true' : 'false';
        }
	    
	    return $answers;
    }

    /**
     * Создание нового ответа
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Обновляем статус заявки (Новая -> В работе) при необходимости
        $req = RequestModel::find($request->request_id);
        if ($req->status_id == 1) {
            $req->status_id = 2;
            $req->save();
        }

        $requestData = $request->all();
        $result = Answer::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных ответа и сообщений по нему
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $answer = Answer::where('id', $id)->with(['messages', 'messages.user:id,email,name,role_id', 'messages.user.role:id,role', 'user:id,name'])->get();
        // TODO: get() -> first(). Пока оставил для совместимости
        foreach ($answer[0]->messages ?? [] as $key => $message){            
            if ($message->attachment != null){                
                $message->attachment = "data:image/x-icon;base64," . base64_encode(Storage::get($message->attachment));
                $answer[0]->messages[$key] = $message;
            }            
        }
        if ($answer->count() == 0) return response()->json(['error'=>'Answer not found'], 404);
        return $answer;
    }

    /**
     * Изменение параметров ответа
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Answer::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление ответа
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Answer::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
