<?php

namespace App\Http\Controllers;

use App\Models\Exercise;

class DashboardController extends Controller
{
    public function index()
    {
        $totalExercises = Exercise::count();
        $behindGoal = Exercise::all()->filter(fn($e) => $e->isBehindGoal())->count();
        $completed = Exercise::all()->filter(fn($e) => $e->getStatus() === 'Completed')->count();
        $onTrack = Exercise::all()->filter(fn($e) => $e->getStatus() === 'On Track')->count();
        $totalCalories = Exercise::all()->sum(fn($e) => $e->totalCalories());
        $recentExercises = Exercise::latest()->take(5)->get();

        $categoryData = Exercise::all()->groupBy('category')->map(function ($group) {
            return $group->sum(fn($e) => $e->totalCalories());
        });

        $topExercises = Exercise::all()
            ->sortByDesc(fn($e) => $e->totalCalories())
            ->take(5)
            ->map(fn($e) => ['name' => $e->name, 'calories' => $e->totalCalories()])
            ->values();

        return view('dashboard', compact(
            'totalExercises', 'behindGoal', 'completed', 'onTrack',
            'totalCalories', 'recentExercises', 'categoryData', 'topExercises'
        ));
    }
}