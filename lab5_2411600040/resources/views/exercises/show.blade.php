@extends('layouts.app')
@section('title', $exercise->name)

@section('content')
<h2>{{ $exercise->name }}</h2>
<div class="card"><div class="card-body">
    <p><strong>Code:</strong> {{ $exercise->sku }}</p>
    <p><strong>Category:</strong> {{ $exercise->category }}</p>
    <p><strong>Description:</strong> {{ $exercise->description ?? 'N/A' }}</p>
    <p><strong>Sessions:</strong> {{ $exercise->sessions_completed }} / {{ $exercise->weekly_goal }}</p>
    <p><strong>Calories per Session:</strong> {{ $exercise->calories_per_session }}</p>
    <p><strong>Total Calories:</strong> {{ $exercise->totalCalories() }}</p>
    <p><strong>Instructor:</strong> {{ $exercise->instructor ?? 'N/A' }}</p>
    <a href="{{ route('exercises.edit', $exercise) }}" class="btn btn-primary">Edit</a>
    <a href="{{ route('exercises.index') }}" class="btn btn-outline-secondary">Back</a>
</div></div>
@endsection