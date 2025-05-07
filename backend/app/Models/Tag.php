<?php

namespace App\Models;

use App\Models\Traits\HasFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tag extends Model
{
    use HasFactory, HasFilter, SoftDeletes;
    protected $fillable = [
        'name'
    ];

    public function tasks()
    {
        return $this->belongsToMany(Task::class);
    }
}
