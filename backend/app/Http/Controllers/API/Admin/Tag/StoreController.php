<?php


namespace App\Http\Controllers\API\Admin\Tag;


use App\Http\Controllers\API\Tag\BaseController;
use App\Http\Requests\Tag\StoreRequest;
use App\Http\Resources\Tag\TagResource;
use Illuminate\Http\JsonResponse;

class StoreController extends BaseController
{

    public function __invoke(StoreRequest $request)
    {
        $data = $request->validated();
        $response = $this->service->store($data);

        if ($response instanceof JsonResponse) {
            return $response;
        }

        $this->cache->putModel("tag", $response);

        return new TagResource($response);
    }
}
