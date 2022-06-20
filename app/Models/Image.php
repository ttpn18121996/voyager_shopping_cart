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
        'imageable_type', 'imageable_id', 'type', 'image_url', 'created_at', 'updated_at',
    ];

    public function imageable()
    {
        return $this->morphTo();
    }
}
