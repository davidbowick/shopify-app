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
					
					<option  data-image="{{$product->featuredImage->transformedSrc}}" data-product-title="{{ $product->title }}" data-variant-title="{{ $variant->node->title }}" data-variant-id="{{ $variant->node->id }}" value="{{ $variant->node->id }}" @if(!$variant->node->availableForSale) disabled @endif>{{ $variant->node->title }}</option>
					@endforeach	
				</select>
			</div>
			<?php $custom_to_show = ['Color','Glass','Swing']; ?>
			@if (strpos($product->title, 'Special') !== false)
			@foreach ($custom_to_show as $cs) 
			@foreach (config('global.custom_fields') as $customField)
				@if ($cs == $customField['name'])
				<div class="special__input grid__item field">
					<label>{{$cs}}</label>
					<select class="{{ $cs }}" name="properties[{{ $cs }}]">
						@foreach ($customField['options'] as $option)
						<option value="{{ $option }}">{{ $option }}</option>
						@endforeach
					</select>
				</div>
				@endif
				@endforeach
			@endforeach			
			@endif	
		</div>
		<a href="#" class="product-list__add btn">Add</a>
	</div>
</div>
@endsection