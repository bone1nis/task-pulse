<?php

namespace App\Http\Requests\Task;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            "title" => "nullable|string",
            "description" => "nullable|string",
            "is_completed" => "nullable|boolean",
            "due_date" => "nullable|date",
            "tags" => "nullable|array",
            "tags.*" => "nullable|integer|exists:tags,id",
            "category_id" => "nullable|integer|exists:categories,id",
        ];
    }
}
