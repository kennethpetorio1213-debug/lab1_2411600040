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
        $totalCalories = Exercise::all()->sum(fn($e) => $e->totalCalories());
        $recentExercises = Exercise::latest()->take(5)->get();

        return view('dashboard', compact('totalExercises', 'behindGoal', 'completed', 'totalCalories', 'recentExercises'));
    }
}