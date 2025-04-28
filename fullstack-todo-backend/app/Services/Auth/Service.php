<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\JWTAuth;

class Service
{
    protected $jwt;

    public function __construct(JWTAuth $jwt)
    {
        $this->jwt = $jwt;
    }
    public function createUser(array $data)
    {
        $data['password'] = $this->hashPassword($data['password']);
        $data['role'] = $this->getDefaultRole();

        $user = User::create($data);

        return $user;
    }

    public function hashPassword(string $password): string
    {
        return Hash::make($password);
    }

    public function getDefaultRole(): string
    {
        return 'user';
    }

    public function generateToken(User $user): string
    {
        return $this->jwt->fromUser($user);
    }
}
