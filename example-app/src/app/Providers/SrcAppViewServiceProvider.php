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
    $this->loadViewsFrom(base_path('src/app/Views'), 'custom');

    // Cho phép copy view ra ngoài bằng lệnh artisan
    // run php artisan vendor:publish --tag=custom-views
    
    if ($this->app->runningInConsole()) {
        $this->publishes([
            base_path('src/app/Views') => resource_path('views/vendor/custom'),
        ], 'custom-views');
    }
}
}