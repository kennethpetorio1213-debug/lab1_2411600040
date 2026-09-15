<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    public function run(): void
    {
        $exercises = [
            ['name' => 'Morning Run', 'sku' => 'EX-001', 'category' => 'Cardio', 'sessions_completed' => 8, 'weekly_goal' => 10, 'calories_per_session' => 320],
            ['name' => 'Cycling', 'sku' => 'EX-002', 'category' => 'Cardio', 'sessions_completed' => 4, 'weekly_goal' => 6, 'calories_per_session' => 280],
            ['name' => 'Swimming', 'sku' => 'EX-003', 'category' => 'Cardio', 'sessions_completed' => 2, 'weekly_goal' => 4, 'calories_per_session' => 400],
            ['name' => 'Jump Rope', 'sku' => 'EX-004', 'category' => 'Cardio', 'sessions_completed' => 5, 'weekly_goal' => 5, 'calories_per_session' => 250],
            ['name' => 'Bench Press', 'sku' => 'EX-005', 'category' => 'Strength', 'sessions_completed' => 3, 'weekly_goal' => 4, 'calories_per_session' => 180],
            ['name' => 'Squats', 'sku' => 'EX-006', 'category' => 'Strength', 'sessions_completed' => 2, 'weekly_goal' => 4, 'calories_per_session' => 220],
            ['name' => 'Deadlift', 'sku' => 'EX-007', 'category' => 'Strength', 'sessions_completed' => 1, 'weekly_goal' => 3, 'calories_per_session' => 250],
            ['name' => 'Pull-Ups', 'sku' => 'EX-008', 'category' => 'Strength', 'sessions_completed' => 4, 'weekly_goal' => 4, 'calories_per_session' => 150],
            ['name' => 'Plank', 'sku' => 'EX-009', 'category' => 'Core', 'sessions_completed' => 5, 'weekly_goal' => 5, 'calories_per_session' => 90],
            ['name' => 'Sit-Ups', 'sku' => 'EX-010', 'category' => 'Core', 'sessions_completed' => 1, 'weekly_goal' => 5, 'calories_per_session' => 80],
            ['name' => 'Russian Twists', 'sku' => 'EX-011', 'category' => 'Core', 'sessions_completed' => 3, 'weekly_goal' => 4, 'calories_per_session' => 70],
            ['name' => 'Leg Raises', 'sku' => 'EX-012', 'category' => 'Core', 'sessions_completed' => 2, 'weekly_goal' => 4, 'calories_per_session' => 65],
            ['name' => 'Yoga', 'sku' => 'EX-013', 'category' => 'Flexibility', 'sessions_completed' => 3, 'weekly_goal' => 3, 'calories_per_session' => 150],
            ['name' => 'Stretching', 'sku' => 'EX-014', 'category' => 'Flexibility', 'sessions_completed' => 1, 'weekly_goal' => 4, 'calories_per_session' => 60],
            ['name' => 'Pilates', 'sku' => 'EX-015', 'category' => 'Flexibility', 'sessions_completed' => 2, 'weekly_goal' => 3, 'calories_per_session' => 140],
        ];

        foreach ($exercises as $exercise) {
            Exercise::create($exercise);
        }
    }
}