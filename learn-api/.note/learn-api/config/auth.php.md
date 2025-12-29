# config/auth.php
Laravel cần biết có một "cửa bảo vệ" mới dành cho LearnApi.
## Providers:
```bash
'providers' => [
    'learn_apis' => [
        'driver' => 'eloquent',
        'model' => App\Models\LearnApi::class,
    ],
],


'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => env('AUTH_MODEL', App\Models\User::class),
        ],
        'learn_apis' => [
            'driver' => 'eloquent',
            'model' => App\Models\LearnApi::class,
        ],

```
## Guards:
```bash
'guards' => [
    'learn_api_auth' => [
        'driver' => 'sanctum', // Hoặc 'session' tùy nhu cầu
        'provider' => 'learn_apis',
    ],
],
```
