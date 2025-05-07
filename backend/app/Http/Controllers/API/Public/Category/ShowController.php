<?php


namespace App\Http\Controllers\API\Public\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Http\Resources\Category\CategoryResource;
use App\Models\Category;

class ShowController extends BaseController
{

    public function __invoke(Category $category)
    {
        return new CategoryResource($category);
    }
}
