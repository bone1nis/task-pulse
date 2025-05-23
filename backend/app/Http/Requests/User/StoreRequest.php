<?php

namespace App\Http\Requests\User;

use App\Http\Requests\Auth\RegisterRequest;

class StoreRequest extends RegisterRequest
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
            'username' => 'required|string|max:255|unique:users,username',
            'role' => 'required|string|in:user,admin',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            "firstname" => 'nullable|string|max:255',
            "lastname" => 'nullable|string|max:255',
            "middlename" => 'nullable|string|max:255',
        ];
    }
}
