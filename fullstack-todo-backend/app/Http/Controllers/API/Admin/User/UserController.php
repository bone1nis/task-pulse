<?php

namespace App\Http\Controllers\API\Admin\User;

use App\Filters\UserFilter;
use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\UpdateRequest;
use App\Http\Requests\User\FilterRequest;
use App\Http\Requests\User\StoreRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use App\Services\User\Service;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public Service $service;

    public function __construct(Service $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(FilterRequest $request, UserFilter $filter)
    {
        $data = $request->validated();

        $perPage = $data["per_page"] ?? 10;

        $users = User::filter($filter)->paginate($perPage);

        return UserResource::collection($users);
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

        return new UserResource($response);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, User $user)
    {
        $data = $request->validated();
        $response = $this->service->update($user, $data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        return $this->service->destroy($user);
    }
}
