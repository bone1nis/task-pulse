<?php

use App\Http\Controllers\API\Admin\User\UserController;
use App\Http\Controllers\API\Public\Task\TaskController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});


Route::group(["middleware" => ["jwt.auth"]], function () {
    Route::apiResource("tasks", TaskController::class);

    Route::get("categories", \App\Http\Controllers\API\Public\Category\IndexController::class);
    Route::get("categories/{category}", \App\Http\Controllers\API\Public\Category\ShowController::class);
    Route::get("tags", \App\Http\Controllers\API\Public\Tag\IndexController::class);
    Route::get("tags/{tag}", \App\Http\Controllers\API\Public\Tag\ShowController::class);

    Route::middleware([RoleMiddleware::class . ':admin'])->group(function () {
        Route::apiResource("users", UserController::class);

        Route::post("categories", \App\Http\Controllers\API\Admin\Category\StoreController::class);
        Route::put("categories/{category}", \App\Http\Controllers\API\Admin\Category\UpdateController::class);
        Route::delete("categories/{category}", \App\Http\Controllers\API\Admin\Category\DestroyController::class);

        Route::post("tags", \App\Http\Controllers\API\Admin\Tag\StoreController::class);
        Route::put("tags/{tag}", \App\Http\Controllers\API\Admin\Tag\UpdateController::class);
        Route::delete("tags/{tag}", \App\Http\Controllers\API\Admin\Tag\DestroyController::class);
    });
});
