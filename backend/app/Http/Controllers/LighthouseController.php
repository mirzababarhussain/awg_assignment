<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;

class LighthouseController extends Controller
{
    public function testPerformance(Request $request) {
        $url = $request->input('url');
        $platform = $request->input('platform');
        $strategy = $platform === 'Desktop' ? 'desktop' : 'mobile';
    
        $response = Http::get("https://www.googleapis.com/pagespeedonline/v5/runPagespeed", [
            'url' => $url,
            'strategy' => $strategy,
            'key' => env('AIzaSyCV7hc_6-nXh7UneBJCvdRt31mQ1bzQZx8'),
        ]);
    
        return response()->json([
            'performance_score' => $response->json('lighthouseResult.categories.performance.score') * 100
        ]);
    }
}


