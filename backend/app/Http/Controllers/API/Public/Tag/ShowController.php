<?php


namespace App\Http\Controllers\API\Public\Tag;


use App\Http\Controllers\API\Tag\BaseController;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class ShowController extends BaseController
{

    public function __invoke($id)
    {
        $tag = $this->cache->rememberModel("tag", $id, function () use ($id) {
            return Tag::findOrFail($id);
        });

        return new TagResource($tag);
    }
}
