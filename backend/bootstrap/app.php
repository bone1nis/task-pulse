<?php

use App\Http\Middleware\ForceJsonResponse;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->append(ForceJsonResponse::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (AuthorizationException $e, $request) {
            return response()->json([
                'message' => "You don't have permission to do this."
            ], 403);
        });

        $exceptions->renderable(function (ModelNotFoundException $e, $request) {
            return response()->json([
                'message' => 'Resource not found.'
            ], 404);
        });

        $exceptions->renderable(function (AccessDeniedHttpException $e, $request) {
            return response()->json([
                'message' => "You don't have permission to do this."
            ], 403);
        });

        $exceptions->renderable(function (NotFoundHttpException $e, $request) {
            return response()->json([
                'message' => "Resource not found."
            ], 404);
        });

        $exceptions->renderable(function (UnauthorizedHttpException $e, $request) {
            return response()->json([
                'message' => "Unauthorized."
            ], 404);
        });

        $exceptions->renderable(function (AuthenticationException $e, $request) {
            return response()->json([
                'message' => "Unauthorized."
            ], 404);
        });

    })->create();
