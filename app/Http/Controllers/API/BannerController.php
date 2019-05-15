<?php

namespace App\Http\Controllers\API;

use App\Banner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

/**
 * @group Banner
 *
 * API методы для работы c баннероами
 */
class BannerController extends Controller
{
    /**
     * Получение списка биннеров
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Banner::all();
    }

    /**
     * Добавление баннера
     *
     * @bodyParam banner file required Файл изображения
     * @bodyParam date_from date Действует С
     * @bodyParam date_to date Действует По
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = Banner::create($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Получение данных по баннеру
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $banner = Banner::find($id);
        if ($banner == null) return response()->json(['error'=>'Banner not found'], 404);
        return $banner;
    }

    /**
     * Редактирование баннера
     * 
     * @bodyParam banner file Файл изображения
     * @bodyParam date_from date Действует С
     * @bodyParam date_to date Действует По
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Banner::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление баннера
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Banner::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
