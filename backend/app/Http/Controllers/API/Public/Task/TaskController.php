<?php

namespace App\Http\Controllers\API\Public\Task;

use App\Filters\TaskFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Task\FilterRequest;
use App\Http\Requests\Task\StoreRequest;
use App\Http\Requests\Task\UpdateRequest;
use App\Http\Resources\Task\TaskResource;
use App\Models\Task;
use App\Services\CacheService;
use App\Services\Task\Service;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    use AuthorizesRequests;

    public Service $service;
    public CacheService $cache;

    public function __construct(Service $service, CacheService $cache)
    {
        $this->service = $service;
        $this->cache = $cache;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(FilterRequest $request, TaskFilter $filter)
    {
        $data = $request->validated();
        $userId = auth()->id();
        $perPage = $data["per_page"] ?? 10;

        $tasks = $this->cache->rememberPaginated("tasks", $data, function () use ($filter, $perPage, $userId) {
            return Task::where('user_id', $userId)
                ->filter($filter)
                ->paginate($perPage);
        });

        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $response = $this->service->store($data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $this->cache->putModel("task", $response);

        return new TaskResource($response);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $task = $this->cache->rememberModel("task", $id, function () use ($id) {
            return Task::findOrFail($id);
        });

        $this->authorize('view', $task);

        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, int $id)
    {
        $data = $request->validated();
        $task = Task::findOrFail($id);

        $this->authorize('update', $task);

        $response = $this->service->update($task, $data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $this->cache->putModel("task", $response);

        return new TaskResource($response);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);

        $this->cache->forgetModel("task", $task);

        return $this->service->destroy($task);
    }
}
