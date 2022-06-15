<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Shop>
 */
class ShopFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->company(),
            'email' => $this->faker->safeEmail(),
            'password' => bcrypt('password'),
            'phone' => $this->faker->e164PhoneNumber(),
            'address' => $this->faker->address(),
            'description' => $this->faker->text(),
            'tax_code' => $this->faker->creditCardNumber(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
