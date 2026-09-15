@extends('layouts.app')
@section('title', 'Exercise Library')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-3">
    <h2>Exercise Library</h2>
    <a href="{{ route('exercises.create') }}" class="btn btn-primary">Add Exercise</a>
</div>

<div class="card filter-card mb-4">
    <div class="card-body">
        <form action="{{ route('exercises.index') }}" method="GET" class="row g-3 align-items-end">
            <div class="col-md-4">
                <label class="form-label">Category</label>
                <select name="category" class="form-select">
                    <option value="all">All Categories</option>
                    @foreach (['Cardio','Strength','Core','Flexibility'] as $cat)
                    <option value="{{ $cat }}" {{ request('category') === $cat ? 'selected' : '' }}>{{ $cat }}</option>
                    @endforeach
                </select>
            </div>
            <div class="col-md-6">
                <label class="form-label">Search</label>
                <input type="text" name="search" class="form-control" placeholder="Search by name or code..." value="{{ request('search') }}">
            </div>
            <div class="col-md-2 d-flex gap-2">
                <button type="submit" class="btn btn-primary w-100">Apply</button>
                @if (request('category') || request('search'))
                <a href="{{ route('exercises.index') }}" class="btn btn-outline-secondary">Reset</a>
                @endif
            </div>
        </form>
    </div>
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
                @forelse ($exercises as $exercise)
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
                @empty
                <tr><td colspan="6" class="text-center text-muted">No exercises found matching your filters.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>
</div>
@endsection