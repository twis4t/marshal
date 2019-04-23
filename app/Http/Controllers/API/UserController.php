<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\Http\Controllers\Controller;
use App\User;
use App\ClientApp;
use App\Request as RequestModel;
use Validator;

/**
 * @group User
 *
 * API методы для работы с пользователями
 */
class UserController extends Controller
{
    public $successStatus = 200;

    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){

            // Валидация входных параметров
            $validator = Validator::make(request()->all(), [
                'application' => 'required'
            ]);    
            if ($validator->fails()) {
                return response()->json(['error'=>$validator->errors()], 401);            
            }
            
            // Ищем приложение (клиент)
            $client = ClientApp::getInfo(request('application'));
            if (is_null($client)) {
                return response()->json(['error'=>'Application does not exist'], 401);
            }

            // Запрашиваем ключ
            $user = Auth::user();
            $http = new Client;
            $response = $http->post(env('APP_URL') . 'oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $client->id,
                    'client_secret' => $client->secret,
                    'username' => $user->name,
                    'password' => request('password'),
                    'scope' => '*',
                ],
            ]);
            $status = $response->getStatusCode();
            $body = $response->getBody();
            switch($status)
            {
                case 200:case 201:
                case 202:
                    $output = json_decode((string) $body, $this->successStatus);
                    break;
                default:
                    $output = ["access_token" => '', 'status_code' => $status];
                    break;

            }
            return $output;
            
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }


    /**
     * Register api
     * 
     * @bodyParam name string required Имя пользователя Example: Test
     * @bodyParam email string required Email Example: test@test.ru
     * @bodyParam password string required Пароль Example: abS34T3fSg4
     * @bodyParam c_password string required Повторить пароль Example: abS34T3fSg4
     * @bodyParam initial bool Признак первичной регистрации Example: 1
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['name'] = $user->name;

        return response()->json(['success'=>$success], $this->successStatus);
    }


    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }

    /**
     * Изменение профиля пользователя
     * 
     * @bodyParam name string Имя пользователя Example: Test
     * @bodyParam email string Email Example: test@test.ru
     * @bodyParam password string Пароль Example: abS34T3fSg4
     * @bodyParam initial bool Признак первичной регистрации Example: 1
     * 
     * @queryParam id required ID пользователя Example: 1
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = User::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение списка пользователей
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $requestsCount = RequestModel::count();        
        $users = User::with('role')->withCount(['requests', 'answers', 'cars', 'messages'])->get();
        $users->each(function($user) use($requestsCount){       
            $user->requests_ratio = ($user->requests_count * 100 / $requestsCount);           
        });       
        return $users;
    }
}
