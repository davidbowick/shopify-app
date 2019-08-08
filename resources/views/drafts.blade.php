@extends('shopify-app::layouts.default')

@section('styles')
<link rel="stylesheet" href="{{ mix('/css/app.css') }}" >
@endsection 

@section('content')
@include('snippets.menu')
<div class="container relative">
	@include('snippets.preloader')
    @php
    $formatter = new NumberFormatter('en_US',  NumberFormatter::CURRENCY);
    @endphp
    <div class="flex flex--justify-space-between flex--align-center">
    	<h1 class="no-margin">My Draft Orders</h1>
    	<a href="/new" class="btn btn-primary">Add New</a>
    </div>
    <hr class="hr--invisible">
    <div class="box">
    	<div class="order-row__headers even-columns">
    		<div class="even-column">
    			<b>Order</b>
    		</div>
    		<div class="even-column">
    			<b>Date</b>
    		</div>
    		<div class="even-column">
    			<b>Customer</b>
    		</div>
    		<div class="even-column">
    			<b>Status</b>
    		</div>
    		<div class="even-column order-total__header">
    			<b>Total</b>
    		</div>
    	</div>
    	@foreach ($drafts as $order)
    	<div class="order-row even-columns">
			<div class="order__id even-column">
				@php 
				$order_id = explode('/',$order->node->id);
				$order_id_split = end($order_id);
				@endphp
				<a target="_blank" href="https://{{$shop->shopify_domain}}/admin/draft_orders/{{ $order_id_split }}">{{ $order->node->name }}</a>
			</div>
			<div class="order__created-at even-column">
				{{ date_format(new DateTime($order->node->createdAt),'Y-m-d') }}
			</div>
			<div class="order__customer even-column">
				@php 
                if($order->node->customer) {
                    $customer_id = explode('/',$order->node->customer->id);
                    $customer_id_split = end($customer_id);
				@endphp
				<a target="_blank" class="order__customer-link" href="https://{{$shop->shopify_domain}}/admin/customers/{{ $customer_id_split }}">{{ $order->node->customer->displayName }}</a>
                @php 
                }
                @endphp   
			</div>

			<div class="order__status even-column">
				<div class="order-status {{ strtolower($order->node->status) }}">
					{{ strtolower($order->node->status) }}
				</div>
                {!!
                    $order->node->status == 'OPEN' ? 
                    '<a class="send-invoice" href="/draft-order/'.$order_id_split.'/send-invoice">Email Invoice</a>' : 
                    ''
                !!}
			</div>

			<div class="order__total even-column">
				<div class="payment-status">
					{{ $formatter->formatCurrency($order->node->totalPrice, 'USD') }}
				</div>
			</div>

    	</div>
    	@endforeach
    </div>
</div>
@endsection