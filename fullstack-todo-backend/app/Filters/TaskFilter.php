<?php

namespace App\Filters;

use Carbon\CarbonImmutable;
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
        $start = CarbonImmutable::parse($value)->startOfDay();
        $end = CarbonImmutable::parse($value)->endOfDay();

        return $this->builder->whereBetween('due_date', [$start, $end]);
    }

    protected function categoryId(int $value): Builder
    {
        return $this->builder->whereHas('category', function ($q) use ($value) {
            $q->where('id', $value);
        });
    }

    protected function tags(array $tags): Builder
    {
        $count = count($tags);

        return $this->builder->whereHas('tags', function ($q) use ($tags) {
            $q->whereIn('id', $tags);
        }, '=', $count);
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
