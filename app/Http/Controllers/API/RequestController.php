<?php

namespace App\Http\Controllers\API;

use App\Request as RequestModel;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
    public function index()
    {
        return RequestModel::all();
    }

    /**
     * Получение списка заявок пользователя
     *
     * @return \Illuminate\Http\Response
     */
    public function userRequests()
    {
        $user = Auth::user();
        return RequestModel::where('user_id', $user->id)->get();
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
        return RequestModel::where('id', $id)->with('answers')->get();
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
}
