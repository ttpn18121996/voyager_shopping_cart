<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterShopRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'max:255', 'email', 'unique:shops'],
            'password' => ['required', 'confirmed', Password::min(8)->letters()->numbers()],
            'phone' => ['required', 'regex:/^[\d]{8,10}$/i'],
            'address' => ['required'],
            'tax_code' => ['required', 'regex:/^[\d]{10}(\-[\d]{3})*$/i'],
        ];
    }
}
