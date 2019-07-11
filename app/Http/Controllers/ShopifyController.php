<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OhMyBrew\ShopifyApp\Facades\ShopifyApp;
use Log;

class ShopifyController extends Controller
{
    public function index() {
  
        $shop = ShopifyApp::shop();
        // Log::info('This is the Shop Object: '.print_r($shop,true));
        $request = $shop->api()->rest('GET','/admin/shop.json');
        // $products = $shop->api()->rest('GET','/admin/products.json')->body->products;
        $title = 'Joy';
        $graphQL = '{
    		shop {
				products(query:"title:*'.$title.'*" first: 5) {
					edges {
						node {
							id
							title
							handle
							featuredImage {
								id
								originalSrc
							}
							variants(first: 10) {
								edges {
									node {
										id
										displayName
									}
								}
							}
						}
					}
				}
			}
    	}';
   		$products = [];
        // $products = $shop->api()->graph($graphQL);
        // $products = $products->body->shop->products->edges;
        // dd($products);
        return view('welcome',compact('request','shop','products'));

    }
    public function search($title) {
    	$shop = ShopifyApp::shop();
    	$request_url = '/admin/products.json?title='.$title;
    	$graphQL = '{
    		shop {
				products(query:"title:*'.$title.'*" first: 5) {
					edges {
						node {
							id
							title
							handle
							featuredImage {
								id
								originalSrc
								transformedSrc(maxWidth: 100)
							}
							variants(first: 10) {
								edges {
									node {
										id
										displayName
									}
								}
							}
						}
					}
				}
			}
    	}';
       
        $products = $shop->api()->graph($graphQL);
        $products = $products->body->shop->products->edges;
    	return $products;
    }
    public function storeDraftOrder(Request $request)
    {
    	$shop = ShopifyApp::shop();
    	$json = $request->json()->all();
    	$result = $shop->api()->rest('POST','/admin/api/2019-04/draft_orders.json',$json);
    	return json_encode($result);
    }
}

?>
