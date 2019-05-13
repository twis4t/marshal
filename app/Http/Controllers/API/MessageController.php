<?php

namespace App\Http\Controllers\API;

use App\Message;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
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
        $messages = Message::all();
        foreach ($messages as $key => $message){            
            if ($message->attachment != null){                
                $message->attachment = base64_encode(Storage::get($message->attachment));
                $messages[$key] = $message;
            }            
        }
        return $messages;

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
        $messages = Message::where('answer_id', $answer_id)->get();
        foreach ($messages as $key => $message){            
            if ($message->attachment != null){                
                $message->attachment = base64_encode(Storage::get($message->attachment));
                $messages[$key] = $message;
            }            
        }
        return $messages;
    }

    /**
     * Создание нового сообщения
     * 
     * @bodyParam answer_id integer required ID ответа Example: 4
     * @bodyParam user_id integer ID пользователя Example: 1
     * @bodyParam message string сообщение Example: hello
     * @bodyParam attachment file вложение
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();   
        $requestData['attachment'] = '';     

        // Если пришел файл - обрабатываем
        if ($request->hasFile('attachment')){
            $path = $request->file('attachment')->store('attachments');
            $requestData['attachment'] = $path;
        } elseif (isset($request->attachment)){
            // Если пришла строка, то base64?
            if (preg_match('/^data:image\/(.*?);base64,/', $request->attachment)) {
                // Указано ли имя?
                if (preg_match('/name=(.*?)\.(\w*?);/', $request->attachment, $matches)) {
                    $fileName = $matches[1];
                    $fileExt = $matches[2];
                    $encodedImg = substr($request->attachment, strpos($request->attachment, ',') + 1);            
                    $img = base64_decode($encodedImg);   
                    $path = 'attachments/'.md5(time().$fileName).".".$fileExt;     
                    Storage::put($path, $img);
                    $requestData['attachment'] = $path;
                }
            }
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
        $message = Message::find($id);
        if (isset($message->attachment) && $message->attachment != null){
            $message->attachment = base64_encode(Storage::get($message->attachment));
        }  
        if ($message == null) return response()->json(['error'=>'Mssage not found'], 404);
        return $message;
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
