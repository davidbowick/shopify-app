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
							variants(first: 100) {
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
   		// $products = [];
        // $products = $shop->api()->graph($graphQL);
        // $products = $products->body->shop->products->edges;
        // dd($products);
        return view('welcome',compact('request','shop'));

    }
    public function searchProducts($title) {
    	$shop = ShopifyApp::shop();
    	// $request_url = '/admin/products.json?title='.$title;
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
										title
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
    public function searchUsers($query) {;
    	$shop = ShopifyApp::shop();    	
    	$graphQL = '{
    		customers(query:"lastName:*'.$query.'*"  first: 5) {
    			edges {
    				node {
    					id
    					displayName
    					email
    				}
    			}
    		}
    	}';
       
        $users = $shop->api()->graph($graphQL);
        $users = $users->body->customers->edges;
        $users = json_decode(json_encode($users),true);
        $i = 0;
        foreach($users as $user) {
        	$hash = md5($user['node']['email']);
        	$users[$i]['node']['hash'] = '//gravatar.com/avatar/'.$hash;
        	$i++;
        }
    	return $users;
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
