<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchResultController extends Controller
{
    public function index(Request $request)
    {
        $keyword = $request->query('keyword');
        $products = [];

        return Inertia::render('SearchResult', compact('keyword', 'products'));
    }
}
