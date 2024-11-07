import React from 'react';
import axios from 'axios';

const Login = ({ setToken }) => {
  const handleLogin = async () => {
    try {
      // Redirect user to your Laravel API's Google login route
      const response = await axios.get('http://localhost:8000/api/auth/google');
      setToken(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
