<?php

namespace App\Http\Controllers\ShopManagement;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShopManagement\StoreProductRequest;
use App\Http\Requests\ShopManagement\UpdateProductRequest;
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
            $this->product->slug = $this->product->generateSlug($request->input('name'));
            $this->product->shop_id = $request->user('shop')->id;
            $this->product->price = $request->input('price');
            $this->product->total = $request->input('total');
            $this->product->status = $request->input('status');
            $this->product->description = $request->input('description');
            $this->product->save();

            $categories = explode(',', $request->input('categories', []));

            $this->product->categories()->attach($categories);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $extension = $file->extension();
                $fileName = $this->product->slug . '-' . time() . '.' . $extension;
                $filePath = $file->storeAs('public/imgs', $fileName, 'local');

                $image = new Image([
                    'name' => $fileName,
                    'type' => Image::THUMBNAIL,
                    'public_url' => Storage::disk('local')->url($filePath),
                    'image_path' => $filePath,
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
                'message' => 'A product has been created successfully.',
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
        return Inertia::render('ShopManagement/EditProduct', compact('product'));
    }

    /**
     * Update the specified product in storage.
     *
     * @param  \App\Http\Requests\ShopManagement\UpdateProductRequest  $product
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            DB::beginTransaction();

            $product->name = $request->input('name');
            $product->slug = $product->generateSlug($request->input('name'));
            $product->shop_id = $request->user('shop')->id;
            $product->price = $request->input('price');
            $product->total = $request->input('total');
            $product->status = $request->input('status');
            $product->description = $request->input('description');
            $product->save();

            $categories = explode(',', $request->input('categories', []));

            $this->product->categories()->attach($categories);

            if ($request->hasFile('thumbnail')) {
                $file = $request->file('thumbnail');
                $extension = $file->extension();
                $fileName = $this->product->slug . '-' . time() . '.' . $extension;
                $filePath = $file->storeAs('public/imgs', $fileName, 'local');

                $image = new Image([
                    'name' => $fileName,
                    'type' => Image::THUMBNAIL,
                    'public_url' => Storage::disk('local')->url($filePath),
                    'image_path' => $filePath,
                    'crop_x' => $request->input('crop_x', 0),
                    'crop_y' => $request->input('crop_y', 0),
                    'crop_width' => $request->input('crop_width', 300),
                    'crop_height' => $request->input('crop_height', 300),
                ]);

                $thumbnail = $this->product->images()->where('type', Image::THUMBNAIL)->first();
                Storage::disk('local')->delete($thumbnail->image_path);

                $this->product->images()->save($image);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'The product specified has been updated successfully.',
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Update the specified product in storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function updateStatus(Request $request, Product $product)
    {
        $product->status = $request->input('status');
        $product->save();

        return response()->json([
            'success' => true,
            'message' => 'Success.'
        ], Response::HTTP_OK);
    }

    /**
     * Remove the specified product from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Inertia\Response
     */
    public function destroy(Product $product)
    {
        $result = $product->delete();
        if ($result) {
            return response()->json([
                'message' => 'A product has been deleted successfully',
                'success' => true,
            ], Response::HTTP_OK);
        }

        return response()->json([
            'message' => 'Whoop! Something went wrong, you can\'t delete this product.',
            'success' => false,
        ], Response::HTTP_BAD_REQUEST);
    }
}
