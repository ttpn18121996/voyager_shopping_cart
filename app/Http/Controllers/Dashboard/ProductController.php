<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = $request->user()->products;

        return Inertia::render('Dashboard/Products', compact('products'));
    }

    public function create(Request $request)
    {
        $categories = $request->user()->categories;

        return Inertia::render('Dashboard/CreateProduct', compact('categories'));
    }

    public function store(Request $request)
    {
        # code...
    }

    public function show(Product $product)
    {
        # code...
    }

    public function edit(Product $product)
    {
        # code...
    }

    public function update(Request $request, Product $product)
    {
        # code...
    }

    public function destroy(Product $product)
    {
        # code...
    }
}
