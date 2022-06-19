<?php

use App\Http\Controllers\Dashboard\{
    CategoryController,
    ShopController
};
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::controller(CategoryController::class)->group(function () {
    Route::get('/api/categories', 'getList')->name('api.categories.index');
    Route::get('/categories', 'index')->name('categories.index');
});

Route::post('/api/shop/{shop}/attach-categories', [ShopController::class, 'attachCategories'])
    ->name('api.shop.attach-categories');
Route::delete('/api/shop/{shop}/category/{category}', [ShopController::class, 'removeCategory'])
    ->name('api.shop.remove-category');
