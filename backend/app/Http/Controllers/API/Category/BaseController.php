<?php

namespace App\Http\Controllers\API\Category;

use App\Http\Controllers\Controller;
use App\Services\CacheService;
use App\Services\Category\Service;

class BaseController extends Controller
{
    public Service $service;
    public CacheService $cache;
    public function __construct(Service $service, CacheService $cache) {
        $this->service = $service;
        $this->cache = $cache;
    }
}
