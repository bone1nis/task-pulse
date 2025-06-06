<?php

namespace App\Http\Controllers\API\Category;

use App\Http\Controllers\Controller;
use App\Services\Category\CategoryCacheService;
use App\Services\Category\Service;

class BaseController extends Controller
{
    public Service $service;
    public CategoryCacheService $cache;
    public function __construct(Service $service, CategoryCacheService $cache) {
        $this->service = $service;
        $this->cache = $cache;
    }
}
