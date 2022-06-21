<?php

namespace App\Http\Controllers\ShopManagement;

use App\Models\Shop;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateShopInfoRequest;
use App\Models\Category;
use Inertia\Inertia;

class ShopController extends Controller
{
    /**
     * @var \App\Models\Shop
     */
    private $shop;

    public function __construct(Shop $shop)
    {
        $this->shop = $shop;
    }

    /**
     * Display the information of current shop.
     *
     * @return \Illuminate\Http\Response
     */
    public function editInfo()
    {
        return Inertia::render('ShopManagement/ShopInfo');
    }

    /**
     * @param  \App\Http\Requests\UpdateShopInfoRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function updateInfo(UpdateShopInfoRequest $request)
    {
        $user = $request->user();
        $user->fill($request->validated());
        $user->update();

        return Inertia::render('ShopManagement/ShopInfo');
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
