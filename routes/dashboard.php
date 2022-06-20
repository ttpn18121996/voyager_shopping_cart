<?php

use App\Http\Controllers\Dashboard\{
    CategoryController,
    ProductController,
    ShopController
};
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::controller(CategoryController::class)->group(function () {
    Route::get('/api/categories', 'getList')->name('dashboard.api.categories.index');
    Route::get('/categories', 'index')->name('dashboard.categories.index');
});

Route::controller(ShopController::class)->group(function () {
    Route::get('/edit-info', 'editInfo')->name('dashboard.shop.edit-info');
    Route::post('/edit-info', 'updateInfo')->name('dashboard.shop.update-info');

    Route::group([
        'as' => 'dashboard.api.shop.',
        'prefix' => '/api/shop',
    ], function () {
        Route::post('/{shop}/attach-categories', 'attachCategories')
            ->name('attach-categories');
        Route::delete('/{shop}/category/{category}', 'removeCategory')
            ->name('remove-category');
    });
});

Route::resource('products', ProductController::class, [
    'as' => 'dashboard',
]);
