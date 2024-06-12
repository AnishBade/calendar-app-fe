import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://anishbade.pythonanywhere.com/api/user/create/ ', {
        email,
        password,
        name,
      });
      const response = await axios.post('https://anishbade.pythonanywhere.com/api/user/token/', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      navigate('/');  // Redirect to homepage
      window.location.reload(); // Reload to update navbar
    } catch (error) {
      console.error('Sign Up failed', error);
      alert('Sign Up failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New User Account</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
