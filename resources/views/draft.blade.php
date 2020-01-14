@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}" >
@endsection 

@section('content')
@include('snippets.menu')
<div class="container relative">
	@include('snippets.preloader')
    <div class="flex flex--justify-space-between flex--align-center">
    	<h1 class="no-margin">Edit Draft Order <small>{{ $id }}</small></h1>
    	<a href="javascript:void(0)" class="btn btn--primary">Update Draft Order</a>
    </div>
    <hr class="hr--invisible">
    <div>
    	@foreach ($draftItems as $lineItem)
       	<div class="box product-list__product">
       		<div class="flex flex--align-center ">
	       		@if ($lineItem->node->variant != null) 
	       		<div class="image">
	       			<img src="{{ $lineItem->node->product->featuredImage->transformedSrc }}" width="50">
	       		</div>
	       		@endif
	       		<div>
		       		<h5>{{ $lineItem->node->title }}</h5>
		       		@if ($lineItem->node->variant != null)
		       		<div>{{ $lineItem->node->variant->title }}</div>
		       		@else 
		       			@foreach ($lineItem->node->customAttributes as $customAttribute)
		       				{{ $customAttribute->value}} 
							@if (!$loop->last)
							/
							@endif
		       			@endforeach
		       		@endif
	       		</div>
	       		@if ($lineItem->node->variant != null) 
	       		<a href="#" data-button-text="Update" data-product-id="{{ $lineItem->node->product->id }}" class="btn draft-order__product-link real-product__edit-link">Edit</a>
	       		@else 
	       		<a href="javascript:void(0);" class="btn custom-product__edit-link">Edit</a>
	       		@endif 
	       	</div>

       		<div class="draft-order__details product-list__details" style="display: none;">
       			<div class="flex flex-wrap grid"
	       		{{-- If it's a custom product --}}
	       		@foreach ($customFields as $customField)
	       		@foreach ($lineItem->node->customAttributes as $customAttribute)
	       			@if ($customAttribute->key == $customField['name'])
	       			<div class="field grid__item">
	       				<label>{{ $customField['name'] }}</label>
	       				@if ($customField['type'] == 'textarea')
	       				<textarea name="{{ strtolower($customField['type']) }}">{{ $customAttribute->value }}</textarea>
	       				@elseif ($customField['type'] == 'select')
	       				<select name="{{ strtolower($customField['type']) }}">
	       					@foreach ($customField['options'] as $option)
	       					<option value="{{ $option }}" {{ $customAttribute->value == $option ? 'selected' : '' }}>{{ $option }}</option>
	       					@endforeach
	       				</select>
	       				@else 
	       				<input name="{{ strtolower($customField['type']) }}" value="{{ $customAttribute->value }}" >
	       				@endif
	       			</div>
	       			@else 

	       			@endif 
	       		@endforeach
	       		@endforeach
	       		</div>
       			</div>
       		</div>
       	</div>
    	@endforeach
    </div>
</div>
@endsection