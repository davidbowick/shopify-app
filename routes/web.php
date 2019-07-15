<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Route::get('shopify', 'ShopifyController@index')->middleware(['auth.shop']);

Route::get('/products/{title}','ShopifyController@searchProducts')->middleware(['auth.shop'])->name('home');
Route::get('/customer/{query}','ShopifyController@searchUsers')->middleware(['auth.shop'])->name('home');
Route::get('/', 'ShopifyController@index')->middleware(['auth.shop','billable'])->name('home');
// Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');
Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');

