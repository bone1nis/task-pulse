<?php

namespace App\Http\Controllers\API\Tag;

use App\Http\Controllers\Controller;
use App\Services\CacheService;
use App\Services\Tag\Service;

class BaseController extends Controller
{
    public Service $service;
    public CacheService $cache;
    public function __construct(Service $service, CacheService $cache  ) {
        $this->service = $service;
        $this->cache = $cache;
    }
}
