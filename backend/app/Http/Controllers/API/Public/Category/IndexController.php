<?php


namespace App\Http\Controllers\API\Public\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Http\Requests\Category\FilterRequest;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class IndexController extends BaseController
{

    public function __invoke(FilterRequest $request)
    {
        $data = $request->validated();

        $perPage = $data['per_page'] ?? 10;

        $categories = $this->cache->rememberPaginated("categories", $data, function () use ($perPage) {
            return Category::paginate($perPage);
        });

        return CategoryResource::collection($categories);
    }
}
