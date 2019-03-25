<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');

Route::group(['middleware' => 'auth:api'], function(){
	Route::get('details', 'API\UserController@details');

	/* Shop */
	Route::get('shops', 'API\ShopController@index');
	Route::get('shop/{id}', 'API\ShopController@show');
	Route::post('shop-add', 'API\ShopController@store');
	Route::put('shop-update/{id}', 'API\ShopController@update');
	Route::delete('shop-detele/{id}', 'API\ShopController@destroy');

	/* Category */
	Route::get('categories', 'API\CategoryController@index');
	Route::get('category/{id}', 'API\CategoryController@show');
	Route::post('category-add', 'API\CategoryController@store');
	Route::put('category-update/{id}', 'API\CategoryController@update');
	Route::delete('category-detele/{id}', 'API\CategoryController@destroy');

});