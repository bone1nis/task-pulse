<?php

namespace App\Services\Category;

use App\Services\CacheService;
use Illuminate\Support\Facades\Cache;

class CategoryCacheService extends CacheService
{
    public function forgetList(): void
    {
        $store = Cache::getStore();

        if (method_exists($store, 'connection')) {
            $redis = $store->connection();
            $keys = $redis->keys('categories:*');

            if (!empty($keys)) {
                $redis->del(...$keys);
            }
        }
    }
}
