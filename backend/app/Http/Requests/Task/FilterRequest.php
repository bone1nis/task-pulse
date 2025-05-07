<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class FilterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "per_page" => "nullable|integer|min:1|max:100",
            "page" => "nullable|integer|min:1",
            "sort" => "nullable|string",
            "title" => "nullable|string",
            "description" => "nullable|string",
            "is_completed" => "nullable|integer",
            "due_date_from" => "nullable|date",
            "due_date_to" => "nullable|date",
            "category_id" => "nullable|integer",
            "tags" => "nullable|array",
            "tags.*" => "nullable|integer|exists:tags,id",
        ];
    }
}
