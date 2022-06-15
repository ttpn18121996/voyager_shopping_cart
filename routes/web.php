<?php

use App\Http\Controllers\{
    CategoryController,
    HomeController,
    SearchResultController
};
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [SearchResultController::class, 'index'])->name('search-result');
Route::get('/categories/{category:slug}', [CategoryController::class, 'index'])->name('categories.index');

require __DIR__.'/auth.php';
