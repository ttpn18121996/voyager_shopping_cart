<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;

class ShopController extends Controller
{
    private $shop;

    public function __construct(Shop $shop)
    {
        $this->shop = $shop;
    }

    /**
     * Attach categories to shop.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Shop  $shop
     * @return \Illuminate\Http\JsonResponse
     */
    public function attachCategories(Request $request, Shop $shop)
    {
        $shop->categories()->sync($request->input('categories', []));

        return response()->noContent();
    }

    /**
     * Remove a category from shop.
     *
     * @param  \App\Models\Shop  $shop
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeCategory(Shop $shop, Category $category)
    {
        $shop->categories()->detach($category);
        
        return response()->noContent();
    }
}
