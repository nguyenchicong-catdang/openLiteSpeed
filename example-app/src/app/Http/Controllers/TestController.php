<?php
namespace SrcApp\Http\Controllers;
use App\Http\Controllers\Controller;

class TestController extends Controller {
    public function index() {
        return view('custom::test');
        //return "tesst abc";
    }
}