<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class TestViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
        $this->loadViewsFrom(base_path('src/app/Views'), 'custom');
    }
}
