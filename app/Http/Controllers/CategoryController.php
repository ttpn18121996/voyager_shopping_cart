<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryCollection;

class CategoryController extends Controller
{
    private $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    public function index(Category $category)
    {
        # code...
    }

    public function getList(Request $request)
    {
        $query = $this->category->newQuery();

        if ($request->has('with') && in_array($request->query('with'), ['shops', 'products'])) {
            $query->with($request->query('with'));
        }

        return new CategoryCollection($query->get());
    }
}
