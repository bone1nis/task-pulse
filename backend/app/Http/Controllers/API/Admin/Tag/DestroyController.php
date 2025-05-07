<?php


namespace App\Http\Controllers\API\Admin\Tag;


use App\Http\Controllers\API\Tag\BaseController;
use App\Models\Tag;

class DestroyController extends BaseController
{

    public function __invoke(Tag $tag)
    {
        return $this->service->destroy($tag);
    }
}
