<?php


namespace App\Http\Controllers\API\Admin\Tag;


use App\Http\Controllers\API\Tag\BaseController;
use App\Http\Requests\Tag\UpdateRequest;
use App\Http\Resources\Tag\TagResource;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;

class UpdateController extends BaseController
{

    public function __invoke(UpdateRequest $request, Tag $tag)
    {
        $data = $request->validated();
        $response = $this->service->update($tag, $data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        return new TagResource($tag);
    }
}
