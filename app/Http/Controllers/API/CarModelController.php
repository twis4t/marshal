<?php

namespace App\Http\Controllers\API;

use App\CarModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

/**
 * @group CarBrand
 *
 * API методы для работы с моделями автомобилей
 */
class CarModelController extends Controller
{
    /**
     * Получение списка моделей машин
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CarModel::all();
    }

    /**
     * Получение списка моделей конкретной марки
     * 
     * @bodyParam car_brand_id int ID марки Example: 1
     *
     * @return \Illuminate\Http\Response
     */
    public function models()
    {
        $validator = Validator::make(request()->all(), [
            'car_brand_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);            
        }
        $car_brand_id = request()->car_brand_id;
        return CarModel::where('car_brand_id', $car_brand_id)->get();
    }

    

    /**
     * Добавление модели
     * 
     * @bodyParam car_model string Модель Example: Astra
     * @bodyParam car_brand_id int ID марки Example: 2
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = CarModel::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по модели
     * 
     * @queryParam id required ID модели Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CarModel::where('id', $id)->get();
    }

    /**
     * Изменение модели
     * 
     * @queryParam id required ID модели Example: 1
     * @bodyParam car_model string Модель Example: Opel
     * @bodyParam car_brand_id int ID марки Example: 2
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = CarModel::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление модели
     *
     * @queryParam id required ID модели Example: 1
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = CarModel::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
