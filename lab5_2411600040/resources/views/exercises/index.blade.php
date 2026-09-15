@extends('layouts.app')
@section('title', 'Exercise Library')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Exercise Library</h2>
    <a href="{{ route('exercises.create') }}" class="btn btn-primary">Add Exercise</a>
</div>

<div class="card">
    <div class="card-body">
        <table class="table table-striped table-hover">
            <thead>
                <tr class="border-accent">
                    <th>Name</th>
                    <th>Category</th>
                    <th>Sessions / Goal</th>
                    <th>Calories / Session</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($exercises as $exercise)
                <tr>
                    <td>{{ $exercise->name }}</td>
                    <td>{{ $exercise->category }}</td>
                    <td>{{ $exercise->sessions_completed }} / {{ $exercise->weekly_goal }}</td>
                    <td>{{ $exercise->calories_per_session }}</td>
                    <td>
                        @php $status = $exercise->getStatus(); @endphp
                        <span class="badge {{ $status === 'Completed' ? 'bg-success' : ($status === 'On Track' ? 'bg-info text-dark' : 'bg-danger') }}">
                            {{ $status }}
                        </span>
                    </td>
                    <td>
                        <a href="{{ route('exercises.show', $exercise) }}" class="btn btn-sm btn-outline-secondary">View</a>
                        <a href="{{ route('exercises.edit', $exercise) }}" class="btn btn-sm btn-outline-primary">Edit</a>
                        <form action="{{ route('exercises.destroy', $exercise) }}" method="POST" class="d-inline" onsubmit="return confirm('Delete this exercise?');">
                            @csrf @method('DELETE')
                            <button class="btn btn-sm btn-outline-danger">Delete</button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection