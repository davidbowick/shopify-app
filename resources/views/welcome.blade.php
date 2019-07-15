@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="/css/app.css" >
@endsection 

@section('content')
<div class="container">
    {{-- <h1>Welcome, {{$request->body->shop->name}}!</h1> --}}
    {{-- <hr/> --}}
    <h3>Type to search products</h3>
    {{-- <a href="/products/Brie">/products/Brie</a> --}}
    <form id="add-product__form" action="/products" method="GET" autocomplete="off" class="box">
        @csrf
        <div class="field flex">
            <label for="add-product" class="visually-hidden">Add a product</label>
            <input id="add-product" type="text" name="product" placeholder="Type to search">
            {{-- <button class="btn btn-primary" type="submit">Add Product</button> --}}
            <a id="clear-results" href="#" class="btn btn-primary" style="display: none;">Clear Results</a>
        </div>
    </form>
    <div class="grid flex relative">
        <div class="main-preloader" style="display: none;">
            <svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="lds-rolling" style="background: none;"><circle cx="50" cy="50" fill="none" stroke-width="10" r="25" stroke-dasharray="117.80972450961724 41.269908169872416" transform="rotate(41.2639 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
        </div>
        <div class="grid__item one-half product-list__hidden box nopacity">
           
        </div>
        <div id="right-column" class="grid__item one-half" >
            {{-- <a href="#" class="btn--add-customer">Add Customer?</a> --}}
            <form id="addCustomerForm" method="GET" action="/customer" class="box relative" autocomplete="off">
                <div class="field relative">
                    <input class="add-customer-form__input" type="text" name="query" placeholder="Add a customer? (Type to search)" value="" >
                    <div class="add-customer-form__results box" style="display: none;"></div>
                </div>
            </form>
            <div id="current-customer" class="box" style="display: none;">
                <h4>Customer</h4>
            </div>
        <form id="create-draft-order" action="/draft-order" method="POST" style="display: none;">
            @csrf
            <div class="draft-order__saved-products box">
                <h4>Products</h4>
                
            </div>
            <div class="text-center"><button id="createDraftOrder" type="submit" class="btn btn-primary">Create Draft Order</button></div>
            <div id="gotoDraftOrder" class="text-center" style="display: none">
                <a href="https://ard-dev.myshopify.com/admin/draft_orders/" target="_blank" class="btn btn-primary">Rad, click here to go see it!</a>
                <hr class="hr--invisible">
                <a href="#" class="btn--start-over">Start Over?</a>
            </div>
        </form>
    </div>
</div>

    @endsection

    @section('scripts')
    @parent
    <script type="text/javascript">
        var AppBridge = window['app-bridge'];
        var actions = AppBridge.actions;
        var TitleBar = actions.TitleBar;
        var Button = actions.Button;
        var Redirect = actions.Redirect;
        var titleBarOptions = {
            title: 'Welcome',
        };
        var myTitleBar = TitleBar.create(app, titleBarOptions);
    </script>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="/js/app.js"></script>
    @endsection