<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OhMyBrew\ShopifyApp\Facades\ShopifyApp;
use App\User;
use Auth;
use Log;

class ShopifyController extends Controller
{
    public function __construct()
    {
        $shop = ShopifyApp::shop(); 
        if(!$shop) {
            return redirect('/login');
        } 
        // $this->middleware('shop.auth');
    }

    public function index() {
        $shop = ShopifyApp::shop();
        if(!$shop) {
            return redirect('/login');
        }
        $salesteam = User::all();
        return view('welcome',compact('shop','salesteam'));
    }
    public function sales() {
        $shop = ShopifyApp::shop();
        if(!$shop) {
            return redirect('/login');
        }
        $salesteam = User::all();
        $user =  Auth::user() ? Auth::user() : false;
        if(!$user) {
            return redirect('/admin/login');
        }
        $graphQL = '{
            orders(first:250, query:"status:any fulfillment_status:any tag:\'Salesperson:'.Auth::user()->name.'\'" , reverse: true) {
                edges {
                    node {
                        id,
                        name,
                        createdAt,
                        tags,
                        closed,
                        fullyPaid,
                        totalPriceSet {
                            shopMoney {
                                amount,
                                currencyCode
                            }
                        },
                        customer {
                            displayName,
                            email,
                            id
                        }
                    }
                }
            }
        }';

        $sales = $shop->api()->graph($graphQL);
        // dd($sales);
        $sales = $sales->body->orders->edges;
        return view('sales',compact('shop','salesteam','user','sales'));
    }
    public function drafts() {
        $shop = ShopifyApp::shop();
        if(!$shop) {
            return redirect('/login');
        }
        $salesteam = User::all();
        $user =  Auth::user() ? Auth::user() : false;
        if(!$user) {
            return redirect('/admin/login');
        }
        $graphQL = '{
            draftOrders(first:250, query:"tag:\'Salesperson:'.Auth::user()->name.'\'", reverse: true) {
                edges {
                    node {
                        id,
                        name,
                        createdAt,
                        totalPrice,
                        tags,
                        status,
                        customer {
                            displayName,
                            email,
                            id
                        }
                    }
                }
            }
        }';
        $drafts = $shop->api()->graph($graphQL);
        // dd($drafts);
        $drafts = $drafts->body->draftOrders->edges;
        return view('drafts',compact('shop','salesteam','user','drafts'));
    }
    public function searchProducts($title) {
    	$shop = ShopifyApp::shop();
        if(!$shop) {
            return redirect('/login');
        }
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
							variants(first: 100) {
								edges {
									node {
										id
										title
									}
								}
							}
                            options {
                                name
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
    //products(query:"title:*'.$title.'*" first: 5) {
    public function searchUsers($query) {;
    	$shop = ShopifyApp::shop();    	
        // return $query;
        // dd($query);
    	$graphQL = '{
    		customers(query:"displayName:'.$query.'" first: 5) {
    			edges {
    				node {
    					id
    					displayName
                        firstName
                        lastName
    					email
                        defaultAddress {
                            address1
                            city
                            province
                            zip
                            country
                        }
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
    public function sendInvoice($id) {
        $shop = ShopifyApp::shop();
        // $json = $request->json()->all();
        $result = $shop->api()->rest('POST','/admin/api/2019-04/draft_orders/'.$param.'/send_invoice.json',$json);
    }
    public function grabProductVariants(Request $request) {
        
    }
}

?>
