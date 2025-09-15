import React, { useState } from "react";
import API from "./api";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await API.post("/auth/signup", form);
      setSuccess(res.data.msg);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Signup</button>
      </form>
      {success && <p style={{color:"green"}}>{success}</p>}
      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default Signup;
