@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}" >
@endsection 

@section('content')
@include('snippets.menu')
<div class="container">
    
    <div class="grid flex relative small--flex-wrap">
        @include('snippets.preloader')
        <div class="grid__item one-whole  ">

            <h4 class="flex flex--align-center">Search Products <span class="hide-special-order__wrapper"><input id="hide-special-order" type="checkbox" checked name="hide_special_order"><label for="hide-special-order">Hide Special Order?</label></span> <a href="#" class="float-right add-custom-product"><small>Add Custom</small></a></h4>
            <form id="add-product__form" action="/products" method="GET" autocomplete="off" class="box">
                @csrf
                <div class="field flex">
                    <label for="add-product" class="visually-hidden">Add a product</label>
                    <input id="add-product" type="text" name="product" placeholder="Type to search products">
                    {{-- <button class="btn btn-primary" type="submit">Add Product</button> --}}
                    <a id="clear-results" href="#" class="btn btn-primary" style="display: none;">Clear</a>
                </div>
                <div class="no-results alert alert-danger" style="display: none;">No results. Please try again.</div>
            </form>
            <div class="box product-list__hidden" style="display: none;"></div>
            <div class="custom-product__build" style="display: none;">
        <h4>Custom Product Builder</h4>
        @php
        function slugify($string){
            return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string), '-'));
        }
        $custom_form_elements = ['Reference','Style','Room','Location','Description','Qty','Type','Width','Height','Construction','Glass','Swing','Color','Bore Holes','Top','Mounting','Roller Catch','Threshold','Jamb','Extended Price','Base Price'];
        $swing = ['TBD','LHI','LHO','RHI','RHO'];
        $glass = ['TBD','Low-e','Sandblast/Frost','Flemish','Rain','Aquatex','Rainbow','Ford Blue','Tea','Water Cube','Water Ripple'];
        $color = ['Oil Rubbed Bronze','Heavy Bronze','Silver Pewter','Black','Pewter','Custom'];
        $boreHoles = ['TBD','Deadbolt','Single Bore Hole','Double Bore Hole'];
        $top = ['TBD','Flat','Half Arch','Arch','Full Arch'];
        $mounting = ['TBD','Tabs','Nailer Fin','Holes'];
        $rollerCatch = ['TBD','Yes','No'];
        $threshold = ['TBD','Yes','No'];
        $type = ['Door','Window'];
        $dev = false;
        @endphp
        <div class="box">
            <div class="flex flex--wrap grid custom-product__grid {{ $dev ? 'dev' : '' }}">
                @foreach ($custom_form_elements as $field)
                <div class="field grid__item field__{{ slugify($field) }} {{ $field == 'Title' ? 'one-whole' : '' }} ">
                    <label for="custom-{{ slugify($field) }}">{{ $field }}</label>
                    @if ($field =='Swing' or $field == 'Glass' or $field == 'Color' or $field == 'Type' or $field == 'Bore Holes' or $field == 'Top' or $field == 'Mounting' or $field == 'Roller Catch' or $field == 'Threshold')
                    @php
                    $myArr = $swing;
                    $myArr = ($field == 'Glass') ? $glass : $myArr;
                    $myArr = ($field == 'Type') ? $type : $myArr;
                    $myArr = ($field == 'Color') ? $color : $myArr;
                    $myArr = ($field == 'Bore Holes') ? $boreHoles : $myArr;
                    $myArr = ($field == 'Top') ? $top : $myArr;
                    $myArr = ($field == 'Mounting') ? $mounting : $myArr;
                    $myArr = ($field == 'Roller Catch') ? $rollerCatch : $myArr;
                    $myArr = ($field == 'Threshold') ? $threshold : $myArr;
                    @endphp
                    <select id="custom-{{ slugify($field) }}" name="custom-{{ slugify($field) }}">
                        @foreach ($myArr as $val)
                        <option value="{{ $val }}">{{ $val }}</option>
                        @endforeach
                    </select>
                    @elseif($field == 'Description')
                    <div class="relative">
                        <textarea class="custom-product__option" id="custom-{{ slugify($field) }}" name="custom-{{ slugify($field) }}"></textarea>
                    </div>
                    @else 
                    <div class="relative">
                        <input class="custom-product__option" type="text" id="custom-{{ slugify($field) }}" name="custom-{{ slugify($field) }}">
                    </div>
                    @endif
                </div>
                @endforeach
                <div class="field grid__item field__sq-ft">
                    <label>Sq. Ft</label>
                    <div class="flex">
                        <div class="custom--square-footage">&nbsp;</div>
                        <button class="btn calculate--square-footage">Calculate</button>
                    </div>
                </div>
            </div>

            <a class="custom--create-btn btn btn--primary" href="#">Add Custom Product</a>
            &nbsp;<a href="#" class="custom--cancel">Cancel</a> <span class="sep">|</span>
            <a href="#" class="custom--clear">Clear Fields</a>
        </div>
    </div>
        </div>
        <div id="right-column" class="grid__item small--one-whole" >
            {{-- <h4>Sales</h4>
            <div class="box">
                <select name="salesperson" id="salesperson">
                    <option val="">Select Salesperson</option>
                    @foreach ($salesteam as $salesperson)
                    <option {{ (Auth::user()->name == $salesperson->name) ? 'selected="selected"' : '' }} val="{{ $salesperson->name }}">{{ $salesperson->name }}</option>
                    @endforeach
                </select> 
            </div>--}}
            <input type="hidden" value="{{Auth::user()->name}}"  name="salesperson" id="salesperson">
            <h4>Customer</h4>
            {{-- <a href="#" class="btn--add-customer">Add Customer?</a> --}}
            <form id="addCustomerForm" method="GET" action="/customer" class="box relative" autocomplete="off">
                <div class="field relative">
                    <input class="add-customer-form__input" type="text" name="query" placeholder="Add a customer? (Type to search)" value="" >
                    <div class="add-customer-form__results box" style="display: none;"></div>
                    <svg width="30px"  height="30px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="customer-form__loader lds-rolling" style="background: none; display: none"><circle cx="50" cy="50" fill="none" stroke-width="10" r="25" stroke-dasharray="117.80972450961724 41.269908169872416" transform="rotate(41.2639 50 50)"><animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform></circle></svg>
                </div>
                <div class="customer--no-results alert alert-danger" style="display: none;">No Results. Please try again.</div>
            </form>
            {{-- <a href="/customer/Steve Martin">Search for Steve Martin</a> --}}
            <div id="current-customer" class="box" style="display: none;">
                
            </div>
        <form id="create-draft-order" action="/draft-order" method="POST" style="display: none;">
            @csrf
            <div class="draft-order__saved-products box">
                <h4>Products</h4>
            </div>
            <div class="text-center"><button id="createDraftOrder" type="submit" class="btn btn-primary">Create Draft Order</button></div>
            <div id="gotoDraftOrder" class="text-center" style="display: none">
                <a href="https://{{$shop->shopify_domain}}/admin/draft_orders/" target="_blank" class="btn btn-primary">Rad, click here to go see it!</a>
                <hr class="hr--invisible">
                <a href="#" role="button" class="btn--download-csv">Download CSV</a><br/>
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
    <script src="{{ mix('/js/app.js') }}"></script>
    @endsection