import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for success or error messages

  const { name, email, phone, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      setMessage(res.data.msg); // Set the success message
      console.log(res.data); // Handle success, like redirecting or saving token
    } catch (err: any) {
      if (err.response) {
        // Server error
        setMessage(err.response.data.msg || "An error occurred"); // Display error message
      } else if (err.request) {
        // Network error
        setMessage("Network error: Unable to connect");
      } else {
        // Other errors
        setMessage("Error: " + err.message);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
        placeholder="Phone"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
      {message && <p>{message}</p>} {/* Display message */}
    </form>
  );
};

export default SignUp;
