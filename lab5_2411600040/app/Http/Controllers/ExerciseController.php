<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{
    public function index()
    {
        $exercises = Exercise::orderBy('name')->get();
        return view('exercises.index', compact('exercises'));
    }

    public function create()
    {
        return view('exercises.create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:exercises,sku',
            'description' => 'nullable|string',
            'category' => 'required|in:Cardio,Strength,Core,Flexibility',
            'sessions_completed' => 'required|integer|min:0',
            'weekly_goal' => 'required|integer|min:1',
            'calories_per_session' => 'required|numeric|min:0',
            'instructor' => 'nullable|string|max:255',
        ], [
            'sku.unique' => 'This exercise code is already in use.',
            'weekly_goal.min' => 'Weekly goal must be at least 1.',
        ]);

        Exercise::create($validated);

        return redirect()->route('exercises.index')->with('success', 'Exercise added successfully!');
    }

    public function show(Exercise $exercise)
    {
        return view('exercises.show', compact('exercise'));
    }

    public function edit(Exercise $exercise)
    {
        return view('exercises.edit', compact('exercise'));
    }

    public function update(Request $request, Exercise $exercise)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:exercises,sku,' . $exercise->id,
            'description' => 'nullable|string',
            'category' => 'required|in:Cardio,Strength,Core,Flexibility',
            'sessions_completed' => 'required|integer|min:0',
            'weekly_goal' => 'required|integer|min:1',
            'calories_per_session' => 'required|numeric|min:0',
            'instructor' => 'nullable|string|max:255',
        ]);

        $exercise->update($validated);

        return redirect()->route('exercises.index')->with('success', 'Exercise updated successfully!');
    }

    public function destroy(Exercise $exercise)
    {
        $exercise->delete();
        return redirect()->route('exercises.index')->with('success', 'Exercise deleted successfully!');
    }
}