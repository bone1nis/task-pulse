<?php

namespace App\Filters;

use Illuminate\Database\Eloquent\Builder;
class UserFilter extends Filter
{
    protected function username(string $value): Builder
    {
        return $this->builder->where('username', 'like', '%' . $value . '%');
    }

    protected function role(string $value): Builder
    {
        return $this->builder->where('role', 'like', '%' . $value . '%');
    }

    protected function email(string $value): Builder
    {
        return $this->builder->where('email', 'like', '%' . $value . '%');
    }

    protected function firstname(string $value): Builder
    {
        return $this->builder->where('firstname', 'like', '%' . $value . '%');
    }

    protected function lastname(string $value): Builder
    {
        return $this->builder->where('lastname', 'like', '%' . $value . '%');
    }

    protected function middlename(string $value): Builder
    {
        return $this->builder->where('middlename', 'like', '%' . $value . '%');
    }

    protected function sort(string $value): Builder
    {
        $direction = 'asc';
        if (str_starts_with($value, '-')) {
            $direction = 'desc';
            $value = ltrim($value, '-');
        }

        if (in_array($value, ['nickname', 'role', 'email', 'firstname', 'lastname', 'middlename'])) {
            return $this->builder->orderBy($value, $direction);
        }

        return $this->builder;
    }

}
