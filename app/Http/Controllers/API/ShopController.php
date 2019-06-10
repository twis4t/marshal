<?php

namespace App\Http\Controllers\API;

use App\Shop;
use App\User;
use Illuminate\Support\Facades\Auth;
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
        return Shop::with(['categories', 'type:id,type', 'carBrands:car_brand'])->get();
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
        $shop = Shop::where('id', $id)->with(['categories', 'type:id,type', 'carBrands:car_brand'])->get();
        if ($shop->count() == 0) return response()->json(['error'=>'Shop not found'], 404);
        return $shop;
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

    /**
     * Получить персонал магазина
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getShopStaff(Request $request)
    {
        $shop = Shop::find($request->id ?? 0);
        if (!isset($shop)) return response()->json(['error'=>'Shop not found'], 404);
        $shopStaff = User::where('shop_id', $request->id)->get();
        return  $shopStaff;
    }

    /**
     * Получить избранные магазины
     *
     * @return \Illuminate\Http\Response
     */
    public function getFavoriteShops()
    {
        $user = Auth::user();
        $result = $user->favoriteShops()->get();
        return response()->json(['result' => $result], 200);
    }

    /**
     * Добавить в избранное
     *
     * @queryParam id required ID магазина Example: 4
     * @bodyParam comment string Комментарий Example: 'Отличный магазин'
     * 
     * @param  int  $id
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addToFavorite($id, Request $request)
    {
        $user = Auth::user();
        $result = $user->favoriteShops()->syncWithoutDetaching([$id => ['comment' => $request->comment ?? null]]);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удалить из избранного
     *
     * @queryParam id required ID магазина Example: 4
     * 
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function removeFromFavorite($id)
    {
        $user = Auth::user();
        $result = $user->favoriteShops()->detach($id);
        return response()->json(['result' => $result], 200);
    }
}
