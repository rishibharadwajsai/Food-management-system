import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });


  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  const { email, password } = formData;


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://food-management-system-backend-url.onrender.com/api/auth/login", 
        formData
      );
      setMessage(res.data.msg); 
      localStorage.setItem('token', res.data.token); 
      navigate('/dashboard/home'); 
    } catch (err: any) {
      
      if (err.response) {
        setMessage(err.response.data.msg || 'An error occurred');
      } else if (err.request) {
        setMessage('Network error: Unable to connect');
      } else {
        setMessage('Error: ' + err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Login to your account</h2>

      {/* Display error message */}
      {message && (
        <div
          className={`p-4 mb-4 text-sm rounded-md ${
            message.includes('success')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={onSubmit}>
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
