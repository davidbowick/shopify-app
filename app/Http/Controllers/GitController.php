<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GitController extends Controller
{
    public function pull(Request $request) 
    {
    	return view('pull');
    }
}
