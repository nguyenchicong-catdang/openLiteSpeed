<?php
namespace SrcApp\Controllers;
use App\Http\Controllers\Controller;

class TestController extends Controller {
    public function index() {
        return view('custom::test');
        //return "tesst abc";
    }
}