<?php

namespace App\Services\Task;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class Service
{
    public function store($data): Task|JsonResponse
    {
        try {
            DB::beginTransaction();

            $data["user_id"] = auth()->id();

            $tags = $data['tags'] ?? [];
            unset($data['tags']);

            $task = Task::create($data);
            $task->tags()->attach($tags);

            DB::commit();

            return $task;
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while creating the task',
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    public function update(Task $task, array $data): Task|JsonResponse
    {
        try {
            DB::beginTransaction();

            if (isset($data["tags"])) {
                $tags = $data["tags"];
                unset($data["tags"]);
                $task->tags()->sync($tags);
            }

            $task->update($data);

            DB::commit();

            return $task;
        } catch (\Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while updating the task',
                'error' => $exception->getMessage()
            ], 500);
        }
    }

    public function destroy(Task $task): JsonResponse
    {
        try {
            DB::beginTransaction();

            $task->delete();

            DB::commit();

            return response()->json([
                "message" => "Task successfully deleted"
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while deleting the task',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
