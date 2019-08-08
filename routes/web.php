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
// Route::get('/', 'ShopifyController@index')->middleware(['auth.shop','billable'])->name('home');
Route::get('/new', 'ShopifyController@index')->middleware(['auth.shop','billable'])->name('home');
Route::get('/', 'ShopifyController@sales')->middleware(['auth.shop','billable'])->name('home');
Route::get('/drafts', 'ShopifyController@drafts')->middleware(['auth.shop','billable'])->name('home');
// Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');
Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');
Route::post('/draft-order/{id}/send-invoice','ShopifyController@sendInvoice')->middleware(['auth.shop']);
// Route::get('/variants','ShopifyController@grabProductVariants')->middleware(['auth.shop'])->name('home');

Route::post('/pull','GitController@pull');
Route::group(['prefix' => 'admin', 'middleware' => 'auth.shop'], function () {
    Auth::routes();
});
// Route::get('/logout','\App\Http\Controllers\Auth\LoginController@logout');


Route::get('/home', 'HomeController@index')->name('home');
