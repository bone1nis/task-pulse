<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
class TaskFilter extends Filter
{
    protected function title(string $value): Builder
    {
        return $this->builder->where('title', 'like', '%' . $value . '%');
    }
    protected function description(string $value): Builder
    {
        return $this->builder->where('description', 'like', '%' . $value . '%');
    }

    protected function isCompleted(int $value): Builder
    {
        return $this->builder->where('is_completed', $value);
    }

    protected function dueDate(string $value): Builder
    {
        return $this->builder->where('due_date', $value);
    }

    protected function categoryId(int $value): Builder
    {
        return $this->builder->whereHas('category', function ($q) use ($value) {
            $q->where('id', $value);
        });
    }

    protected function tags(string $value): Builder
    {
        $tags = explode(',', $value);
        return $this->builder->whereHas('tags', function ($q) use ($tags) {
            $q->whereIn('id', $tags);
        }, "=", count($tags));
    }

    protected function sort(string $value): Builder
    {
        $direction = 'asc';
        if (str_starts_with($value, '-')) {
            $direction = 'desc';
            $value = ltrim($value, '-');
        }

        if (in_array($value, ['title', 'description', 'dueDate', 'isCompleted', 'categoryId'])) {
            return $this->builder->orderBy($value, $direction);
        }

        return $this->builder;
    }

}
