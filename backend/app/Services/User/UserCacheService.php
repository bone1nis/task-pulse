<?php

namespace App\Services\User;

use App\Services\CacheService;
use Illuminate\Support\Facades\Cache;

class UserCacheService extends CacheService
{
    public function forgetList(): void
    {
        $store = Cache::getStore();

        if (method_exists($store, 'connection')) {
            $redis = $store->connection();
            $keys = $redis->keys('users:*');

            if (!empty($keys)) {
                $redis->del(...$keys);
            }
        }
    }
}
