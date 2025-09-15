import React, { useState } from "react";
import API from "./api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await API.post("/auth/login", form);
      setSuccess(`Welcome ${res.data.user.username}`);
      console.log("Token:", res.data.token); // save token for /me route
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {success && <p style={{color:"green"}}>{success}</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default Login;
