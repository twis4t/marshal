<?php

namespace App\Http\Controllers\API;

use App\Shop;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @group Shop
 *
 * API методы для работы с магазинами
 */
class ShopController extends Controller
{
    /**
     * Получение списка магазинов с категориями
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return Shop::with('categories')->get();
    }

    /**
     * Добавление нового магазина
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = Shop::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных и категории конкретного магазина
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Shop::where('id', $id)->with('categories')->get();
    }
    
    /**
     * Обновление данных по магазину
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Shop::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление магазина
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Shop::where('id', $request->id)->delete();
        return response()->json(['result' => $result], 200);
    }

    /**
     * Установить категории
     *
     * @param  int  $id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function setCategories($id, Request $request)
    {
        $requestData = $request->all();
        $shop = Shop::where('id', $request->id)->first();
        $result = $shop->categories()->sync(json_decode($requestData['categories']));
        return response()->json(['result' => $result], 200);
    }
}
