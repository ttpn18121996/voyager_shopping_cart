<?php

namespace Database\Seeders;

use App\Models\Customer;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CustomerSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Customer::truncate();
        Customer::insert([
            [
                'name' => 'John Doe',
                'email' => 'johndoe@example.com',
                'password' => bcrypt('password'),
                'phone' => '+84905128791',
                'address' => '123 Hello World, SampleCountry',
                'type' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Jane Doe',
                'email' => 'janedoe@example.com',
                'password' => bcrypt('password'),
                'phone' => '+84812091123',
                'address' => '123 Hello World, SampleCountry',
                'type' => 0,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
