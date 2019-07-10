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
    <form id="add-product__form" action="/products" method="GET">
        @csrf
        <div class="field flex">
            <label for="add-product" class="visually-hidden">Add a product</label>
            <input id="add-product" type="text" name="product" placeholder="Type to search">
            {{-- <button class="btn btn-primary" type="submit">Add Product</button> --}}
            <a id="clear-results" href="#" class="btn btn-primary" style="display: none;">Clear Results</a>
        </div>
    </form>
    <div class="grid flex">
        <div class="grid__item one-half product-list__hidden nopacity">
            @if ($products)
            {{-- {{ dd($products) }} --}}
            @foreach ($products as $product)
            <div data-id="{{$product->node->id}}">
                <h4>{{$product->node->title}}</h4>
                <ul>
                    {{-- {{ dd($product->node->variants->edges)}} --}}
                    @foreach($product->node->variants->edges as $variant)
                    <li>
                        <a href="#" data-variant-id="{{$variant->node->id}}">{{$variant->node->displayName}}</a>
                    </li>            
                    @endforeach
                </ul>
            </div>
            @endforeach
            @endif
        </div>
        <form class="grid__item one-half" id="create-draft-order" action="/draft-order" method="POST" style="display: none;">
            @csrf
            <div class="draft-order__saved-products">
                
            </div>
            <div class="text-center"><button type="submit" class="btn btn-primary">Create Draft Order</button></div>
        </form>

        
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
    @endsection