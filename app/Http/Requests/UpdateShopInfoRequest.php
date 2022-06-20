<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateShopInfoRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:255', Rule::unique('shops', 'name')->ignore(auth('shop')->id())],
            'phone' => ['required', 'regex:/^[\d]{10}$/i'],
            'address' => ['required'],
            'tax_code' => ['required', 'regex:/^[\d]{10}(\-[\d]{3})*$/i'],
            'description' => ['nullable'],
        ];
    }
}
