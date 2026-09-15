@if ($errors->any())
<div class="alert alert-danger">
    <ul class="mb-0">
        @foreach ($errors->all() as $error) <li>{{ $error }}</li> @endforeach
    </ul>
</div>
@endif

<div class="mb-3">
    <label class="form-label">Exercise Name</label>
    <input type="text" name="name" class="form-control" value="{{ old('name', $exercise->name ?? '') }}" required>
</div>
<div class="mb-3">
    <label class="form-label">Exercise Code (SKU)</label>
    <input type="text" name="sku" class="form-control" value="{{ old('sku', $exercise->sku ?? '') }}" required>
</div>
<div class="mb-3">
    <label class="form-label">Description</label>
    <textarea name="description" class="form-control">{{ old('description', $exercise->description ?? '') }}</textarea>
</div>
<div class="mb-3">
    <label class="form-label">Category</label>
    <select name="category" class="form-select" required>
        @foreach (['Cardio','Strength','Core','Flexibility'] as $cat)
        <option value="{{ $cat }}" {{ old('category', $exercise->category ?? '') === $cat ? 'selected' : '' }}>{{ $cat }}</option>
        @endforeach
    </select>
</div>
<div class="row">
    <div class="col-md-4 mb-3">
        <label class="form-label">Sessions Completed</label>
        <input type="number" name="sessions_completed" class="form-control" value="{{ old('sessions_completed', $exercise->sessions_completed ?? 0) }}" min="0" required>
    </div>
    <div class="col-md-4 mb-3">
        <label class="form-label">Weekly Goal</label>
        <input type="number" name="weekly_goal" class="form-control" value="{{ old('weekly_goal', $exercise->weekly_goal ?? 1) }}" min="1" required>
    </div>
    <div class="col-md-4 mb-3">
        <label class="form-label">Calories per Session</label>
        <input type="number" step="0.01" name="calories_per_session" class="form-control" value="{{ old('calories_per_session', $exercise->calories_per_session ?? 0) }}" min="0" required>
    </div>
</div>
<div class="mb-3">
    <label class="form-label">Instructor</label>
    <input type="text" name="instructor" class="form-control" value="{{ old('instructor', $exercise->instructor ?? '') }}">
</div>