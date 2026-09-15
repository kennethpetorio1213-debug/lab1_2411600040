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

@if ($behindGoal > 0)
<div class="alert alert-warning mb-4">
    ⚠️ {{ $behindGoal }} exercise(s) are behind on weekly goal. <a href="{{ route('exercises.index') }}">View Exercise Library</a>
</div>
@endif

<div class="card mb-4">
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

<div class="row mb-4">
    <div class="col-md-4 mb-3">
        <div class="card chart-card shadow-hover">
            <div class="card-header"><h6 class="mb-0">Calories Burned by Category</h6></div>
            <div class="card-body" style="height: 280px;">
                <canvas id="categoryChart"></canvas>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div class="card chart-card shadow-hover">
            <div class="card-header"><h6 class="mb-0">Goal Status Distribution</h6></div>
            <div class="card-body" style="height: 280px;">
                <canvas id="statusChart"></canvas>
            </div>
        </div>
    </div>
    <div class="col-md-4 mb-3">
        <div class="card chart-card shadow-hover">
            <div class="card-header"><h6 class="mb-0">Top 5 Exercises</h6></div>
            <div class="card-body" style="height: 280px;">
                <canvas id="topExercisesChart"></canvas>
            </div>
        </div>
    </div>
</div>

<script>
    window.chartData = {
        categoryLabels: @json($categoryData->keys()),
        categoryValues: @json($categoryData->values()),
        completed: {{ $completed }},
        onTrack: {{ $onTrack }},
        behindGoal: {{ $behindGoal }},
        topNames: @json($topExercises->pluck('name')),
        topCalories: @json($topExercises->pluck('calories'))
    };
</script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="{{ asset('js/dashboard-charts.js') }}"></script>
@endsection