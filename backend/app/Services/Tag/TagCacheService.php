<?php

namespace App\Services\Tag;

use App\Services\CacheService;
use Illuminate\Support\Facades\Cache;

class TagCacheService extends CacheService
{
    public function forgetList(): void
    {
        $store = Cache::getStore();

        if (method_exists($store, 'connection')) {
            $redis = $store->connection();
            $keys = $redis->keys('tags:*');

            if (!empty($keys)) {
                $redis->del(...$keys);
            }
        }
    }
}
