<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class CacheService
{
    protected int|\DateInterval|\DateTimeInterface $defaultTtl;

    public function __construct()
    {
        $this->defaultTtl = now()->addMinutes(5);
    }

    public function remember(string $key, \Closure $callback, $ttl = null)
    {
        $ttl = $ttl ?? $this->defaultTtl;
        return Cache::remember($key, $ttl, $callback);
    }

    public function put(string $key, mixed $value, $ttl = null)
    {
        $ttl = $ttl ?? $this->defaultTtl;
        Cache::put($key, $value, $ttl);
    }

    public function forget(string $key)
    {
        Cache::forget($key);
    }

    public function rememberModel(string $prefix, int|string $id, \Closure $callback, $ttl = null): mixed
    {
        return $this->remember("{$prefix}:{$id}", $callback, $ttl);
    }
    public function putModel(string $prefix, Model $model, $ttl = null): void
    {
        $this->put("{$prefix}:{$model->id}", $model, $ttl);
    }

    public function forgetModel(string $prefix, Model|int|string $model): void
    {
        $id = $model instanceof Model ? $model->id : $model;
        $this->forget("{$prefix}:{$id}");
    }

    public function rememberPaginated(string $prefix, array $filters, \Closure $callback, $ttl = null): mixed
    {
        $key = "{$prefix}:" . md5(json_encode($filters));
        return $this->remember($key, $callback, $ttl);
    }
}
