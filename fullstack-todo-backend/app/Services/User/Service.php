<?php

namespace App\Services\User;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Services\Auth\Service as AuthService;

class Service
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function store(array $data): User|JsonResponse
    {
        try {
            DB::beginTransaction();

            $user = $this->authService->createUser($data);

            DB::commit();

            return $user;
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while creating the user',
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    public function update(User $user, array $data): User|JsonResponse
    {
        try {
            DB::beginTransaction();

            if (isset($data['password'])) {
                $data['password'] = $this->authService->hashPassword($data['password']);
            }

            $user->update($data);

            DB::commit();

            return $user;
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while updating the user',
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    public function destroy(User $user): JsonResponse
    {
        try {
            DB::beginTransaction();

            $user->delete();

            DB::commit();

            return response()->json([
                "message" => "User successfully deleted"
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while deleting the user',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
