<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    const THUMBNAIL = 0;
    const AVATAR = 1;
    const ATTACHMENT = 2;

    protected $fillable = [
        'imageable_type',
        'imageable_id',
        'type',
        'name',
        'crop_x',
        'crop_y',
        'crop_width',
        'crop_height',
        'public_url',
        'image_path',
        'created_at',
        'updated_at',
    ];

    public function imageable()
    {
        return $this->morphTo();
    }
}
