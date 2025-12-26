# custom boottrap
## example-app/public/index.php

 //$app = require_once __DIR__.'/../bootstrap/app.php';
 
 $app = require_once __DIR__.'/../src/bootstrap/app.php';
# custom src/app
## composer.json
 "SrcApp\\": "src/app/",

 composer dump-autoload
## Custom vỉew
```bash
<?php
//example-app/src/app/Providers/SrcAppViewServiceProvider.php
// use SrcApp\Providers\SrcAppViewServiceProvider
namespace SrcApp\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View; // Import Facade View

class SrcAppViewServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Đăng ký namespace 'custom' trỏ vào thư mục src/app/Views
        // base_path() sẽ lấy đường dẫn tuyệt đối đến thư mục gốc của dự án
        //View::addNamespace('custom', __DIR__ .'src/app/Views');
        //$this->loadViewsFrom(__DIR__.'/../Views', 'custom');
        //$this->loadViewsFrom(base_path('src/app/Views'), 'custom');
        View::addNamespace('custom', base_path('src/app/Views'));
    }
}
```
## custum controller
```bash
<?php
namespace SrcApp\Controllers;
use App\Http\Controllers\Controller;

class TestController extends Controller {
    public function index() {
        return view('custom::test');
        //return "tesst abc";
    }
}
```
