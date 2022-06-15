<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::truncate();
        Category::insert([
            [
                'name' => 'IPhone',
                'slug' => 'iphone',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mac',
                'slug' => 'mac',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'IPad',
                'slug' => 'ipad',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Watch',
                'slug' => 'watch',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sound',
                'slug' => 'sound',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Accessory',
                'slug' => 'accessory',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
