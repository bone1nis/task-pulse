<?php

namespace App\Services\Category;

use App\Models\Category;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class Service
{
    public function store(array $data): Category|JsonResponse
    {
        try {
            DB::beginTransaction();

            $category = Category::create($data);

            DB::commit();

            return $category;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while creating the category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Category $category, array $data): Category|JsonResponse
    {
        try {
            DB::beginTransaction();

            $category->update($data);

            DB::commit();

            return $category;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while updating the category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Category $category): JsonResponse
    {
        try {
            DB::beginTransaction();

            $category->delete();

            DB::commit();

            return response()->json([
                'message' => 'Category successfully deleted'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'An error occurred while deleting the category',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
