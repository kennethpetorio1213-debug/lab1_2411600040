@extends('layouts.app')
@section('title', 'Edit Exercise')

@section('content')
<h2>Edit Exercise</h2>
<div class="card"><div class="card-body">
    <form action="{{ route('exercises.update', $exercise) }}" method="POST">
        @csrf @method('PUT')
        @include('exercises._form', ['exercise' => $exercise])
        <button type="submit" class="btn btn-primary">Update Exercise</button>
        <a href="{{ route('exercises.index') }}" class="btn btn-outline-secondary">Cancel</a>
    </form>
</div></div>
@endsection