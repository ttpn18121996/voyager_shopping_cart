<?php

use App\Http\Controllers\{
    CategoryController,
    HomeController,
    SearchResultController
};
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchResultController::class, 'index'])->name('search-result');
Route::get('/categories/{category:slug}', [CategoryController::class, 'index'])->name('categories.index');

require __DIR__.'/auth.php';
