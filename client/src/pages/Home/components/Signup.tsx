import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
//   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

 
  const [message, setMessage] = useState<string | null>(null);

  // Handle form input change
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://foodbookingapp-backend-uri.vercel.app/api/auth/signup",
        formData
      );
      setMessage(res.data.msg);
    
      const userData = res.data.user;
    
      sessionStorage.setItem('user', JSON.stringify(userData));
      
    //   navigate('/dashboard');
      
    } catch (err: any) {
      if (err.response) {
        setMessage(err.response.data.msg || "An error occurred");
      } else if (err.request) {
        setMessage("Network error: Unable to connect");
      } else {
        setMessage("Error: " + err.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create a new account</h2>
      
      {/* Display success/error message */}
      {message && (
        <div className={`mb-4 p-3 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} rounded-md`}>
          {message}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
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
            value={formData.password}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        {/* Phone Field */}
        <div className="mb-4">
          <label className="block text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
