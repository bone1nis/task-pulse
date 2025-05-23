<?php


namespace App\Http\Controllers\API\Admin\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Models\Category;

class DestroyController extends BaseController
{

    public function __invoke(Category $category)
    {
        $this->cache->forgetModel("category", $category);

        return $this->service->destroy($category);
    }
}
