<?php

namespace App\Services\Task;

use App\Services\CacheService;
use Illuminate\Support\Facades\Cache;

class TaskCacheService extends CacheService
{
    public function forgetList(): void
    {
        $store = Cache::getStore();

        if (method_exists($store, 'connection')) {
            $redis = $store->connection();
            $keys = $redis->keys('tasks:*');

            if (!empty($keys)) {
                $redis->del(...$keys);
            }
        }
    }
}
