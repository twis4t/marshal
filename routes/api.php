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

	/* User */
	Route::get('users', 'API\UserController@index');
	Route::put('user-update/{id}', 'API\UserController@update');

	/* Shop */
	Route::get('shops', 'API\ShopController@index');
	Route::get('shop/{id}', 'API\ShopController@show');
	Route::post('shop-add', 'API\ShopController@store');
	Route::put('shop-update/{id}', 'API\ShopController@update');
	Route::put('shop-set-categories/{id}', 'API\ShopController@setCategories');
	Route::delete('shop-detele/{id}', 'API\ShopController@destroy');
	
	/* Category */
	Route::get('categories', 'API\CategoryController@index');
	Route::get('category/{id}', 'API\CategoryController@show');
	Route::post('category-add', 'API\CategoryController@store');
	Route::put('category-update/{id}', 'API\CategoryController@update');
	Route::delete('category-detele/{id}', 'API\CategoryController@destroy');

	/* Request */
	Route::get('requests', 'API\RequestController@index');
	Route::get('userRequests', 'API\RequestController@userRequests');
	Route::get('request/{id}', 'API\RequestController@show');
	Route::post('request-add', 'API\RequestController@store');
	Route::put('request-update/{id}', 'API\RequestController@update');
	Route::delete('request-detele/{id}', 'API\RequestController@destroy');

	/* Answer */
	Route::get('answers', 'API\AnswerController@index');
	Route::get('answer/{id}', 'API\AnswerController@show');
	Route::post('answer-add', 'API\AnswerController@store');
	Route::put('answer-update/{id}', 'API\AnswerController@update');
	Route::delete('answer-detele/{id}', 'API\AnswerController@destroy');

	/* Messages */
	Route::get('messages', 'API\MessageController@index');
	Route::get('answerMessages', 'API\MessageController@answerMessages');
	Route::get('message/{id}', 'API\MessageController@show');
	Route::post('message-add', 'API\MessageController@store');
	Route::put('message-update/{id}', 'API\MessageController@update');
	Route::delete('message-detele/{id}', 'API\MessageController@destroy');

});