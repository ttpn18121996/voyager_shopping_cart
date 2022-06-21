<?php

namespace App\Http\Controllers\ShopManagement;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $products = $request->user()->products;

        return Inertia::render('ShopManagement/Products', compact('products'));
    }

    /**
     * Display a form for create a new product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $categories = $request->user()->categories;

        return Inertia::render('ShopManagement/CreateProduct', compact('categories'));
    }

    /**
     * Store a newly created product in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        # code...
    }

    /**
     * Display the specified product.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function show(Product $product)
    {
        # code...
    }

    /**
     * Show the form for editing the specified product.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function edit(Product $product)
    {
        # code...
    }

    /**
     * Update the specified product in storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function update(Request $request, Product $product)
    {
        # code...
    }

    /**
     * Remove the specified product from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function destroy(Product $product)
    {
        # code...
    }
}
