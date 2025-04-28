<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "user_id" => fake()->numberBetween(1, 20),
            "category_id" => fake()->numberBetween(1, 10),
            "title" => fake()->word(),
            "description" => fake()->paragraph(),
            "is_completed" => fake()->boolean(),
            "due_date" => fake()->dateTime(),
        ];
    }
}
