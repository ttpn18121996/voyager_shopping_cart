<?php

namespace App\Http\Requests\ShopManagement;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'name' => ['required', 'max:255'],
            'categories' => ['required'],
            'price' => ['integer', 'min:0'],
            'total' => ['integer', 'min:0'],
            'description' => ['nullable', 'string'],
            'status' => ['integer', 'in:0,1'],
            'thumbnail' => ['nullable', 'file', 'max:512', 'mimes:jpg,jpeg,png'],
            'crop_x' => ['nullable', 'numeric'],
            'crop_y' => ['nullable', 'numeric'],
            'crop_width' => ['nullable', 'numeric'],
            'crop_height' => ['nullable', 'numeric'],
        ];
    }
}
