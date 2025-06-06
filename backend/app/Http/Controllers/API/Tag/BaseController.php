<?php

namespace App\Http\Controllers\API\Tag;

use App\Http\Controllers\Controller;
use App\Services\CacheService;
use App\Services\Tag\Service;
use App\Services\Tag\TagCacheService;

class BaseController extends Controller
{
    public Service $service;
    public TagCacheService $cache;
    public function __construct(Service $service, TagCacheService $cache) {
        $this->service = $service;
        $this->cache = $cache;
    }
}
