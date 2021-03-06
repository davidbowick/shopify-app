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
    $total = 0;
    if($sales) {
        foreach($sales as $order) {
           if($order->node->fullyPaid) {
              $total += $order->node->totalPriceSet->shopMoney->amount;	
          }
      }
    }
    @endphp
    <div class="flex flex--justify-space-between flex--align-center">
    	<h1 class="">My Sales</h1>
        <div class="heading--buttons flex flex--align-center">
            <small><a class="export--draft-orders" href="javascript:void(0);">Export</a></small>
            <h1 class="my-total-sales">{{ $formatter->formatCurrency($total, 'USD') }}</h1>
        </div>
    	
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
    			<b>Payment</b>
    		</div>
    		<div class="even-column">
    			<b>Fulfillment</b>
    		</div>
    		<div class="even-column order-total__header">
    			<b>Total</b>
    		</div>
    	</div>
        @if ($sales)
    	@foreach ($sales as $order)
    	<div class="order-row even-columns">
    		{{-- {{ json_encode($order) }} --}}
    		{{-- <a href="/" --}}
			<div class="order__id even-column">
				{{ $order->node->name }}
			</div>
			<div class="order__created-at even-column">
				{{ date_format(new DateTime($order->node->createdAt),'Y-m-d') }}
			</div>
			<div class="order__customer even-column">
				{{-- end(split('/',$order->node->customer->id)) --}}
				@php 
				$id = explode('/',$order->node->customer->id);
				$id_split = end($id);
				@endphp
				<a target="_blank" class="order__customer-link" href="https://{{$shop->shopify_domain}}/admin/customers/{{ $id_split }}">{{ $order->node->customer->displayName }}</a>
			</div>
			<div class="order__payment even-column">
				<div class="order-status {{ $order->node->fullyPaid ? 'complete' : 'incomplete' }}">
					{{ $order->node->fullyPaid ? 'paid' : 'unpaid' }}
				</div>
			</div>
			<div class="order__fulfillment even-column">
				<div class="order-status {{ $order->node->closed ? 'complete' : 'incomplete' }}">
					{{ $order->node->closed ? 'fulfilled' : 'unfulfilled' }}
				</div>
			</div>
			<div class="order__total even-column">
				<div class="payment-status {{ $order->node->fullyPaid ? 'paid' : 'unpaid' }}">
					{{ $formatter->formatCurrency($order->node->totalPriceSet->shopMoney->amount, 'USD') }}
				</div>
			</div>

    	</div>
    	@endforeach
        @else 
        @for ($i = 1; $i < 6; $i++)
        <div class="order-row even-columns">
            <div class="order__id even-column">
                #D1234{{ $i }}
            </div>
            <div class="order__created-at even-column">
                2020-01-0{{ $i }}
            </div>
            <div class="order__customer even-column">
                Dummy Test Data
            </div>
            <div class="even-column"></div>
            <div class="even-column"></div>
            <div class="order__total even-column">
                ${{ $i }}0,000
            </div>
        </div>
        @endfor
        @endif
    </div>
</div>
@endsection