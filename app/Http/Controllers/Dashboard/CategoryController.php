<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryCollection;

class CategoryController extends Controller
{
    /**
     * @var \App\Models\Category
     */
    private $category;

    public function __construct(Category $category)
    {
        $this->category = $category;
    }

    /**
     * Display a list of the category.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $categories = $request->user('shop')->categories;

        return Inertia::render('Dashboard/Categories', compact('categories'));
    }

    /**
     * Get a list of the category.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \App\Http\Resources\CategoryCollection
     */
    public function getList(Request $request)
    {
        $shopsCategories = [];

        if ($request->user('shop')) {
            $shopsCategories = $request->user('shop')->categories->pluck('id')->toArray();
        }

        $query = $this->category->newQuery();

        if ($request->has('with') && in_array($request->query('with'), ['shops', 'products'])) {
            $query->with($request->query('with'));
        }

        $categories = $query->get()->map(function ($category) use ($shopsCategories) {
            $category->selected = false;

            if (in_array($category->id, $shopsCategories)) {
                $category->selected = true;
            }

            return $category;
        });

        return new CategoryCollection($categories);
    }
}
