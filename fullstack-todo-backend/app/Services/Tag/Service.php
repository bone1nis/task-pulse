<?php

namespace App\Services\Tag;

use App\Models\Tag;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class Service
{
    public function store(array $data): Tag|JsonResponse
    {
        try {
            DB::beginTransaction();

            $tag = Tag::create($data);

            DB::commit();

            return $tag;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while creating the tag',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Tag $tag, array $data): Tag|JsonResponse
    {
        try {
            DB::beginTransaction();

            $tag->update($data);

            DB::commit();

            return $tag;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while updating the tag',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Tag $tag): JsonResponse
    {
        try {
            DB::beginTransaction();

            $tag->delete();

            DB::commit();

            return response()->json([
                'message' => 'Tag successfully deleted'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while deleting the tag',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
