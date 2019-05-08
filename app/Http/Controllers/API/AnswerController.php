<?php

namespace App\Http\Controllers\API;

use App\Answer;
use App\Request as RequestModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
        return Answer::all();
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
        $answer = Answer::where('id', $id)->with(['messages', 'messages.user:id,email,name'])->get();
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
