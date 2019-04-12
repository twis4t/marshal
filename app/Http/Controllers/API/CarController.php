<?php

namespace App\Http\Controllers\API;

use App\Car;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * @group Car
 *
 * API методы для работы с автомобилями пользователя
 */
class CarController extends Controller
{
    /**
     * Получение списка автомобилей
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Car::all();
    }

    /**
     * Создание нового автомобиля
     * 
     * @bodyParam user_id integer required ID пользователя Example: 4
     * @bodyParam car_brand_id integer required ID марки Example: 2
     * @bodyParam car_model_id integer required ID модели Example: 2
     * @bodyParam year integer Год выпуска Example: 2008
     * @bodyParam vin string VIN номер Example: 2GNFLGEK6C6345315
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = Car::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по автомобилю
     * 
     * @queryParam id required ID автомобиля Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Car::where('id', $id)->with(['car_brand', 'car_model'])->get();
    }

    /**
     * Изменение автомобиля
     * 
     * @queryParam id required ID автомобиля Example: 1
     * 
     * @bodyParam user_id integer ID пользователя Example: 4
     * @bodyParam car_brand_id integer ID марки Example: 2
     * @bodyParam car_model_id integer ID модели Example: 2
     * @bodyParam year integer Год выпуска Example: 2008
     * @bodyParam vin string VIN номер Example: 2GNFLGEK6C6345315
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Car::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление автомобиля
     * 
     * @queryParam id required ID автомобиля Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Car::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
