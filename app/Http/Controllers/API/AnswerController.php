<?php

namespace App\Http\Controllers\API;

use App\Answer;
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
        return Answer::where('id', $id)->with(['messages', 'messages.user' => function($query){
            $query->select('id', 'name');
        }])->get();
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
