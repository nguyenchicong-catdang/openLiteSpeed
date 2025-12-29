<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class BlockApiFromBrowser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Nếu không phải yêu cầu JSON (truy cập bình thường từ trình duyệt)
        if ($request->acceptsHtml() && !$request->ajax()) {
            abort(403, 'Giao diện web không hỗ trợ đường dẫn này');
        }
        return $next($request);
    }
}
