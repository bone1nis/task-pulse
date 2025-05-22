<?php

use Illuminate\Support\Facades\Route;

Route::get('/redis-test', function () {
    \Illuminate\Support\Facades\Cache::put('foo', 'bar', 10);
    return \Illuminate\Support\Facades\Cache::get('foo');
});
