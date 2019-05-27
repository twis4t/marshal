<?php

namespace App\Http\Controllers\API;

use App\Banner;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

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
        $banners = Banner::all();
        foreach ($banners as $key => $banner){            
            if ($banner->banner != null){                
                $banner->banner = "data:image/x-icon;base64," . base64_encode(Storage::get($banner->banner));
                $banners[$key] = $banner;
            }            
        }
        return $banners;
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
        $requestData['banner'] = '';
        
        // Если пришел файл - обрабатываем
        if ($request->hasFile('banner')){
            $path = $request->file('banner')->store('banners');
            $requestData['banner'] = $path;
        } elseif (isset($request->banner)){
            // Если пришла строка, то base64?
            if (preg_match('/^data:image\/(.*?);base64,/', $request->banner)) {
                // Указано ли имя?
                if (preg_match('/name=(.*?)\.(\w*?);/', $request->banner, $matches)) {
                    $fileName = $matches[1];
                    $fileExt = $matches[2];
                    $encodedImg = substr($request->banner, strpos($request->banner, ',') + 1);            
                    $img = base64_decode($encodedImg);   
                    $path = 'banners/'.md5(time().$fileName).".".$fileExt;     
                    Storage::put($path, $img);
                    $requestData['banner'] = $path;
                }
            }
        }
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
        if (isset($banner->banner) && $banner->banner != null){
            $banner->banner = "data:image/x-icon;base64," . base64_encode(Storage::get($banner->banner));
        }  
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
        $requestData['banner'] = '';
         // Если пришел файл - обрабатываем
        if ($request->hasFile('banner')){
            $path = $request->file('banner')->store('banners');
            $requestData['banner'] = $path;
        } elseif (isset($request->banner)){
            // Если пришла строка, то base64?
            if (preg_match('/^data:image\/(.*?);base64,/', $request->banner)) {
                // Указано ли имя?
                if (preg_match('/name=(.*?)\.(\w*?);/', $request->banner, $matches)) {
                    $fileName = $matches[1];
                    $fileExt = $matches[2];
                    $encodedImg = substr($request->banner, strpos($request->banner, ',') + 1);            
                    $img = base64_decode($encodedImg);   
                    $path = 'banners/'.md5(time().$fileName).".".$fileExt;     
                    Storage::put($path, $img);
                    $requestData['banner'] = $path;
                }
            }
        }
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
        $result = false;
        $banner = Banner::find($id);
        if (Storage::delete($banner->banner)){
            $result = Banner::where('id', $id)->delete();
        }
        return response()->json(['result' => $result], 200);
    }
}
