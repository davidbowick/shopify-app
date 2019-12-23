@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}" >
@endsection 

@section('content')
@include('snippets.menu')
<div class="container relative">

	{{-- {{print_r($product)}} --}}
<div class="product-single">
	<div class="product-list__product__main flex flex--align-center">
		<div class="product-list__image">
			<img src="{{$product->featuredImage->transformedSrc}}" width="50">
		</div>
		<div class="draft-order__title">
			<h5>
				{{ $product->title }}				
			</h5>
		</div>
	</div>
	<hr class="hr--invisible">
	<div class="product-list__details">
		
		    {{-- {{ $item->size }} --}}
		<div class="flex flex--wrap grid--half-gutters">
			<div class="grid__item field">
				<label>Variant</label>
				<select class="variant-list__variants">
					@foreach ($product->variants->edges as $variant)
					<option  data-image="{{$product->featuredImage->transformedSrc}}" data-product-title="{{ $product->title }}" data-variant-title="{{ $variant->node->title }}" data-variant-id="{{ $variant->node->id }}" value="{{ $variant->node->id }}">{{ $variant->node->title }}</option>
					@endforeach	
				</select>
			</div>
			@if (strpos($product->title, 'Special') !== false)
			<div class="special__input grid__item field">
				<label>Color</label>
				<select class="color" name="color[]">
					<option value="Oil Rubbed Bronze">Oil Rubbed Bronze</option>
					<option value="Heavy Bronze">Heavy Bronze</option>
					<option value="Silver Pewter">Silver Pewter</option>
					<option value="Black">Black</option>
					<option value="Pewter">Pewter</option>
				</select>
			</div>
			<div class="special__input grid__item field">
				<label>Glass</label>
				<select class="glass" name="glass[]">
					<option value="Low-E">Low-E</option>
					<option value="Sandblast/Frost">Sandblast/Frost</option>
					<option value="Flemish">Flemish</option>
					<option value="Rain">Rain</option>
					<option value="Aquatex">Aquatex</option>
					<option value="Rainbow">Rainbow</option>
					<option value="Ford Blue">Ford Blue</option>
					<option value="Tea">Tea</option>
					<option value="Water Cube">Water Cube</option>
				</select>
			</div>
			<div class="special__input grid__item field">
				<label>Swing</label><select name="swing[]">
					<option value="Left-Hand - In swing">Left-Hand - In swing</option>
					<option value="Left-Hand - Out swing">Left-Hand - Out swing</option>
					<option value="Right-Hand - In swing">Right-Hand - In swing</option>
					<option value="Right-Hand - Out swing">Right-Hand - Out swing</option>
				</select>
			</div>
			@endif	
		</div>
		
		<a href="#" class="product-list__add btn">Add</a>
		
	</div>
</div>
@endsection