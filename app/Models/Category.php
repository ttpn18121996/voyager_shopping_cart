<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'slug', 'created_at', 'updated_at',
    ];

    public function shops()
    {
        return $this->belongsToMany(Shop::class);
    }
}
