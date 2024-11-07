<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    /**
     * Redirect the user to the Google authentication page.
     *
     * @return \Illuminate\Http\Response
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->scopes(['profile', 'email'])->redirect();
    }

    /**
     * Obtain the user information from Google.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleGoogleCallback()
{
    try {
        // Step 1: Retrieve the user information from Google
        $googleUser = Socialite::driver('google')->stateless()->user();

        // Step 2: Check if the user already exists in the database
        $user = User::where('email', $googleUser->getEmail())->first();

        // Step 3: If the user doesn't exist, create a new user
        if (!$user) {
            $user = User::create([
                'name' => $googleUser->getName(),
                'email' => $googleUser->getEmail(),
                'password' => bcrypt(Str::random(24)), // Assign a random password
                
            ]);
        }

        // Step 4: Generate a new API token for the user
        $token = $user->createToken('API Token')->plainTextToken;

        // Step 5: Return the token in the response
        return response()->json(['token' => $token], 200);

    } catch (\Exception $e) {
        // Handle exceptions (e.g., log errors or return a failure response)
        return response()->json(['error' => 'Authentication failed'], 500);
    }
}
    /**
     * Log out the user from the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}