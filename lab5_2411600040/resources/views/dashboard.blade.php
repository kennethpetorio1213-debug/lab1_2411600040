@extends('layouts.app')
@section('title', 'Dashboard')

@section('content')
<h2 class="pb-2 mb-3 border-bottom greeting-divider">Good Day, {{ Auth::user()->name }}!</h2>

<div class="row mb-4">
    <div class="col-md-3 mb-3">
        <div class="card stat-card shadow-hover text-center">
            <div class="card-body">
                <h5 class="card-title text-muted">Total Exercises</h5>
                <h2 class="card-text fw-bold text-primary">{{ $totalExercises }}</h2>
            </div>
        </div>
    </div>
    <div class="col-md-3 mb-3">
        <div class="card stat-card shadow-hover text-center">
            <div class="card-body">
                <h5 class="card-title text-muted">Completed</h5>
                <h2 class="card-text fw-bold text-success">{{ $completed }}</h2>
            </div>
        </div>
    </div>
    <div class="col-md-3 mb-3">
        <div class="card stat-card shadow-hover text-center">
            <div class="card-body">
                <h5 class="card-title text-muted">Behind Goal</h5>
                <h2 class="card-text fw-bold text-warning">{{ $behindGoal }}</h2>
            </div>
        </div>
    </div>
    <div class="col-md-3 mb-3">
        <div class="card stat-card shadow-hover text-center">
            <div class="card-body">
                <h5 class="card-title text-muted">Total Calories</h5>
                <h2 class="card-text fw-bold text-info">{{ number_format($totalCalories) }}</h2>
            </div>
        </div>
    </div>
</div>

<div class="card">
    <div class="card-header"><h5 class="mb-0">Recently Added Exercises</h5></div>
    <div class="card-body">
        <table class="table table-striped">
            <thead><tr class="border-accent"><th>Name</th><th>Category</th><th>Added</th></tr></thead>
            <tbody>
                @foreach ($recentExercises as $ex)
                <tr><td>{{ $ex->name }}</td><td>{{ $ex->category }}</td><td>{{ $ex->created_at->diffForHumans() }}</td></tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection