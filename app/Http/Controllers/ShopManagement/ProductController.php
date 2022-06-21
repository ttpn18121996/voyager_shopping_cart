<?php

namespace App\Http\Controllers\ShopManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShopManagement\StoreProductRequest;
use App\Models\{
    Image,
    Product
};
use Illuminate\Http\{
    Request,
    Response
};
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    private $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

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
     * @param  \App\Http\Requests\ShopManagement\StoreProductRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        try {
            DB::beginTransaction();

            $this->product->name = $request->input('name');
            $this->product->slug = str()->slug($request->input('name'));
            $this->product->shop_id = $request->user('shop')->id;
            $this->product->price = $request->input('price');
            $this->product->total = $request->input('total');
            $this->product->description = $request->input('description');
            $this->product->save();

            $categories = explode(',', $request->input('categories', []));

            $this->product->categories()->attach($categories);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $extension = $file->extension();
                $fileName = $this->product->slug . '-' . time() . '.' . $extension;

                $image = new Image([
                    'name' => $fileName,
                    'type' => Image::THUMBNAIL,
                    'image_url' => $file->storeAs('public/imgs', $fileName, 'local'),
                    'crop_x' => $request->input('crop_x', 0),
                    'crop_y' => $request->input('crop_y', 0),
                    'crop_width' => $request->input('crop_width', 300),
                    'crop_height' => $request->input('crop_height', 300),
                ]);

                $this->product->images()->save($image);
            }

            DB::commit();

            return response()->json([
                'product' => $this->product,
                'message' => 'a product has been created successfully.',
                'success' => true,
            ], Response::HTTP_CREATED);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'success' => false,
            ], Response::HTTP_BAD_REQUEST);
        }
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
        try {
            DB::beginTransaction();

            $product->categories()->sync([]);

            $product->images->pluck('image_url')->each(function ($path) {
                Storage::disk('local')->delete($path);
            });

            $product->images()->delete();

            $product->delete();

            DB::commit();

            return response()->json([
                'message' => 'a product has been deleted successfully',
                'success' => true,
            ], Response::HTTP_OK);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => $e->getMessage(),
                'success' => false,
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
