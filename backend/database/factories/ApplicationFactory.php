<?php

namespace Database\Factories;

use App\Models\Application;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Application>
 */
class ApplicationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'company' => fake()->company(),
            'role' => fake()->jobTitle(),
            'status' => fake()->randomElement([
                'applied',
                'interview',
                'offer',
                'rejected'
            ]),
            'date_applied' => fake()->dateTimeBetween('-1 year', 'now'),
            'notes' => fake()->sentence(),
            'salary_min' => fake()->numberBetween(30000, 80000)
        ];
    }
}
