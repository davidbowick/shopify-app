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
// Route::get('/', 'HomeController@index')->name('home');
// Route::get('shopify', 'ShopifyController@index')->middleware(['auth.shop']);


Route::group(['middleware'=>'auth.shop'],function() {
	#All Products
	Route::get('/products/{title}','ShopifyController@searchProducts')->middleware(['auth.shop'])->name('home');
	#Single Product
	Route::get('/product/{id}','ShopifyController@singleProduct')->middleware(['auth.shop'])->name('home');
	#Users
	Route::get('/customer/{query}','ShopifyController@searchUsers')->middleware(['auth.shop'])->name('home');
	// Route::get('/', 'ShopifyController@index')->middleware(['auth.shop','billable'])->name('home');
	Route::get('/new', 'ShopifyController@index')->middleware(['auth.shop','billable'])->name('home');
	Route::get('/', 'ShopifyController@sales')->middleware(['auth.shop','billable'])->middleware('auth')->name('home');
	// Route::get('/','\App\Http\Controllers\Auth\LoginController@login');
	Route::get('/drafts', 'ShopifyController@drafts')->middleware(['auth.shop','billable'])->name('home');
	Route::get('/drafts/{id}','ShopifyController@showDraft')->middleware(['auth.shop','billable'])->name('home');
	Route::get('/drafts/{id}/edit','ShopifyController@draftEdit')->middleware(['auth.shop','billable'])->name('home');
	Route::get('/drafts/{id}/update','ShopifyController@draftUpdate')->middleware(['auth.shop','billable'])->name('home');
	// Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');
	Route::post('/draft-order','ShopifyController@storeDraftOrder')->middleware(['auth.shop'])->name('home');

	Route::post('/draft-order/{id}/send-invoice','ShopifyController@sendInvoice')->middleware(['auth.shop']);
	// Route::get('/variants','ShopifyController@grabProductVariants')->middleware(['auth.shop'])->name('home');

	Route::post('/pull','GitController@pull');
});


// Route::get('/login',function() {
// 	return 'login';
// });
// Auth::routes()->middleware(['auth.shop','billable']);

// Route::get('install');

Route::group(['prefix' => 'user'], function () {
    Auth::routes();
    // Route::post('/admin/enter', 'Auth\AuthController@login');
});
// Route::get('/login','\App\Http\Controllers\Auth\LoginController@login');

Route::get('/user/logout',function() {
	Auth::logout();
	return redirect('/user/login');
})->middleware(['auth.shop']);


// Route::get('/home', 'HomeController@index')->name('home');
