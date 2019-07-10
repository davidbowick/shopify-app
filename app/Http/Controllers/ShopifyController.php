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

    	$json = $request->json()->all();

    	$shop = ShopifyApp::shop();
    	$variant_id = 12480865468534;
    	// return $variant_id;
    	// return json_decode($request);
    	// dd($request);
    	// dd(json_encode($request));

    	/*
    	$result = $shop->api()->graph(
    		'mutation collectionCreate($input: CollectionInput!) { 
    			collectionCreate(input: $input) { 
    				userErrors { 
    					field message 
    				} 
    				collection { 
    					id 
    				} 
    			} 
    		}',
    		['input' => ['title' => 'Test Collection']]
    	);
		return $result->body->collectionCreate->collection->id; // gid://shopify/Collection/63171592234
		*/
		/*
		$result = $shop->api()->graph(
    		'mutation draftOrderCreate($input: DraftOrderInput!) { 
    			draftOrderCreate(input: $input) { 
    				userErrors { 
    					field message 
    				} 
    				draftOrder { 
    					id 
    				} 
    			} 
    		}',
    		[ "input" => [ "lineItems" => [ "variantId" => $variant_id ]]]
    	);
    	*/


    	/*$params = [
		  "draft_order" => [
		    "line_items" => [
		      [
		        "variant_id" => $variant_id,
		        "quantity" => 1
		      ]
		    ]
		  ]
		];*/
		// $params = json_decode($request, true);	
		// return json_encode($request->request);


		// return $request->body;
		// print_r($request);
		// dd($request);
		// return json_decode($request);
    	$result = $shop->api()->rest('POST','/admin/api/2019-04/draft_orders.json',$json);
    	return json_encode($result);
    	// dd($result);
 
  
 
    }
}

?>
