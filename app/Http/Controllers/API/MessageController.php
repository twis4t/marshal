<?php

namespace App\Http\Controllers\API;

use App\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

/**
 * @group Message
 *
 * API методы для работы с сообщениями
 */
class MessageController extends Controller
{
    /**
     * Получение списка сообщений
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()  
    {
        return Message::all();
    }

    /**
     * Получение списка сообщений для ответа
     * 
     * @queryParam answer_id required ID ответа
     * @return \Illuminate\Http\Response
     */
    public function answerMessages()
    {
        // Валидация входных параметров
        $validator = Validator::make(request()->all(), [
            'answer_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }

        $requestData = request()->all();
        $answer_id = $requestData['answer_id'];
        return Message::where('answer_id', $answer_id)->get();
    }

    /**
     * Создание нового сообщения
     * 
     * @bodyParam answer_id integer required ID ответа Example: 4
     * @bodyParam user_id integer ID пользователя Example: 1
     * @bodyParam message string сообщение Example: hello
     * @bodyParam attachment string вложение
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();        

        if ($request->hasFile('attachment')){
            $file = $request->file('attachment');
            $filename = md5(time().$file->getClientOriginalName());
            $file->move('/images/attachments/', $filename); 
            $requestData['attachment'] = '/images/attachments/'.$filename;   
        }
        $result = Message::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по сообщению
     * 
     * @queryParam id required ID сообщения Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Message::where('id', $id)->get();
    }

    /**
     * Изменение сообщения
     * 
     * @queryParam id required ID сообщения Example: 1
     * @bodyParam answer_id integer ID ответа Example: 4
     * @bodyParam user_id integer ID пользователя Example: 1
     * @bodyParam message string сообщение Example: hello
     * @bodyParam attachment string вложение
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Message::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление сообщения
     * 
     * @queryParam id required ID сообщения
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Message::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
