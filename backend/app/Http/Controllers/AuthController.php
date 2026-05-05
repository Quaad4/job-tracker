<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterAuthRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterAuthRequest $request) 
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([ 'token' => $token, 'user' => $user, 'message' => 'User registered successfully'], 201);
    }
}
