<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // User Regisger
    public function register(Request $request) {

        // $fields = $request->validate([
        //     'name' => 'required|string',
        //     'email' => 'required|email',
        //     'password' => 'required|confirmed'
        // ]);
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        $create_user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role'=> 'user',
            'password' => Hash::make($request['password']),
        ]);
        // $user = new User();
        // $user->name = $request->input('name');
        // $user->email = $request->input('email');
        // $user->role = 'user';
        // $user->password = bcrypt($request->input('password'));
        // $user->save();

       
        $token = $create_user->createToken('myAppToken')->plainTextToken;

        $response = [
            'user' => $create_user,
            'token' => $token
        ];

        return response($response, 201);
    }


    // User Login
    public function login(Request $request) {

        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Checking email
        $user = User::where('email', $fields['email'])->first();

        // Checking password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'Invalid email or password'
            ], 401);
        }

        $token = $user->createToken('myAppToken')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];

        return response($response, 201);
    }


    // User Logout
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}
