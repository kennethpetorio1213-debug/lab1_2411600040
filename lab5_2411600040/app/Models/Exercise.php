<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'sku', 'description', 'category',
        'sessions_completed', 'weekly_goal', 'calories_per_session', 'instructor'
    ];

    public function totalCalories(): float
    {
        return $this->sessions_completed * $this->calories_per_session;
    }

    public function isBehindGoal(): bool
    {
        return $this->sessions_completed < ($this->weekly_goal * 0.5);
    }

    public function getStatus(): string
    {
        if ($this->sessions_completed >= $this->weekly_goal) return 'Completed';
        if ($this->sessions_completed >= $this->weekly_goal * 0.5) return 'On Track';
        return 'Behind';
    }
}