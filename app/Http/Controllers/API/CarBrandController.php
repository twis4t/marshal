<?php

namespace App\Http\Controllers\API;

use App\CarBrand;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * @group CarBrand
 *
 * API методы для работы с марками автомобилей
 */
class CarBrandController extends Controller
{
    /**
     * Получение списка марок машин
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CarBrand::all();
    }

    /**
     * Добавление марки
     * 
     * @bodyParam car_brand string Марка Example: Opel
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = CarBrand::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по марке
     * 
     * @queryParam id required ID марки Example: 1
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return CarBrand::where('id', $id)->with('car_models')->get();
    }

    /**
     * Изменение марки
     * 
     * @queryParam id required ID марки Example: 1
     * @bodyParam car_brand string Марка Example: Opel
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = CarBrand::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление марки
     *
     * @queryParam id required ID марки Example: 1
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = CarBrand::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
