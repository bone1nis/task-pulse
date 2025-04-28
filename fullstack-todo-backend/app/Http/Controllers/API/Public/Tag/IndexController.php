<?php


namespace App\Http\Controllers\API\Public\Tag;


use App\Http\Controllers\API\Tag\BaseController;
use App\Http\Requests\Tag\FilterRequest;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;

class IndexController extends BaseController
{

    public function __invoke(FilterRequest $request)
    {
        $data = $request->validated();

        $perPage = $data['per_page'] ?? 10;

        $categories = Tag::paginate($perPage);

        return TagResource::collection($categories);
    }
}
