<?php

namespace App\Http\Controllers\API;

use App\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @group Category
 *
 * API методы для работы с категориями
 */
class CategoryController extends Controller
{
    /**
     * Получение списка категорий
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::with('shops')->get();
    }

    /**
     * Создание новой категории
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $requestData = $request->all();
        $result = Category::create($requestData);
        $category = Category::where('id', $result->id)->with('shops')->first();
        return response()->json(['result' => $category], 200);
    }

    /**
     * Получение данных и списка магазинов по конкретной категории
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::where('id', $id)->with('shops')->get();
        if ($category->count() == 0) return response()->json(['error'=>'Category not found'], 404);
        return $category;
    }

    /**
     * Изменение категории
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $requestData = $request->all();
        $result = Category::where('id', $id)->update($requestData);
        return response()->json(['result' => $result], 200);
    }

    /**
     * Удаление категории
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $result = Category::where('id', $id)->delete();
        return response()->json(['result' => $result], 200);
    }
}
