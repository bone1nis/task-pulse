<?php


namespace App\Http\Controllers\API\Public\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class ShowController extends BaseController
{

    public function __invoke($id)
    {
        $category = $this->cache->rememberModel("category", $id, function () use ($id) {
            return Category::findOrFail($id);
        });

        return new CategoryResource($category);
    }
}
