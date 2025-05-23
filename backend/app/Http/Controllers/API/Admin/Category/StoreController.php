<?php


namespace App\Http\Controllers\API\Admin\Category;

use App\Http\Controllers\API\Category\BaseController;
use App\Http\Requests\Category\StoreRequest;
use App\Http\Resources\Category\CategoryResource;
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

        $this->cache->putModel("category", $response);

        return new CategoryResource($response);
    }
}
