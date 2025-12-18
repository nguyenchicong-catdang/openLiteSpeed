# Service Provider
## Nạp Config tự động
public function register()
{
    $this->mergeConfigFrom(__DIR__.'/../Config/mysettings.php', 'mysettings');
}
## Nạp Migration (Dự phòng cho DB)
public function boot()
{
    $this->loadMigrationsFrom(__DIR__.'/../Database/Migrations');
}

# Khai báo Command (Artisan)
if ($this->app->runningInConsole()) {
    $this->commands([
        \SrcApp\Console\Commands\YourCustomCommand::class,
    ]);
}
