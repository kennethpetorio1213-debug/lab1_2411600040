@extends('layouts.app')
@section('title', 'Add Exercise')

@section('content')
<h2>Add New Exercise</h2>
<div class="card"><div class="card-body">
    <form action="{{ route('exercises.store') }}" method="POST">
        @csrf
        @include('exercises._form')
        <button type="submit" class="btn btn-primary">Save Exercise</button>
        <a href="{{ route('exercises.index') }}" class="btn btn-outline-secondary">Cancel</a>
    </form>
</div></div>
@endsection