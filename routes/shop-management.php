<?php

use App\Http\Controllers\ShopManagement\{
    CategoryController,
    ProductController,
    ShopController
};
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('ShopManagement');
})->name('shop-management');

Route::controller(CategoryController::class)->group(function () {
    Route::get('/api/categories', 'getList')->name('shop-management.api.categories.index');
    Route::get('/categories', 'index')->name('shop-management.categories.index');
});

Route::controller(ShopController::class)->group(function () {
    Route::get('/edit-info', 'editInfo')->name('shop-management.shop.edit-info');
    Route::post('/edit-info', 'updateInfo')->name('shop-management.shop.update-info');

    Route::group([
        'as' => 'shop-management.api.shop.',
        'prefix' => '/api/shop',
    ], function () {
        Route::post('/{shop}/attach-categories', 'attachCategories')
            ->name('attach-categories');
        Route::delete('/{shop}/category/{category}', 'removeCategory')
            ->name('remove-category');
    });
});

Route::resource('products', ProductController::class, [
    'as' => 'shop-management',
]);
