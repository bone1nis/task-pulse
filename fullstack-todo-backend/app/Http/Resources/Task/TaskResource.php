<?php

namespace App\Http\Resources\Task;

use App\Http\Resources\Category\CategoryResource;
use App\Http\Resources\Tag\TagResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user" => new UserResource($this->user),
            "category" => new CategoryResource($this->category),
            "title" => $this->title,
            "description" => $this->description,
            "is_completed" => $this->is_completed,
            "due_date" => $this->due_date,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
            "tags" => TagResource::collection($this->tags)
        ];
    }
}
