<?php


namespace App\Http\Controllers\API\Admin\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Http\Requests\Category\UpdateRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;

class UpdateController extends BaseController
{

    public function __invoke(UpdateRequest $request, Category $category)
    {
        $data = $request->validated();
        $response = $this->service->update($category, $data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $this->cache->putModel("category", $response);

        return new CategoryResource($response);
    }
}
