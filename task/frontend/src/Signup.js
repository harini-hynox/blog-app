import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import { API } from "./api";
import NavBar from "./components/navBar";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // ✅ hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await API.post("/auth/signup", form);
      setSuccess(res.data.msg);
      setForm({ username: "", email: "", password: "" });

      // ✅ navigate to login after showing success
      setTimeout(() => {
        navigate("/login");
      }, 1500); // wait 1.5s so user can read message
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-customPurple ">
      <NavBar className="h-[15%]" />
      <div className="h-[80%] flex flex-col items-center justify-center ">
        <h2 className="p-4 text-2xl font-bold font-sans text-customGray">Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 ">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="px-4 py-2 text-xl text-customGray bg-white border rounded-md"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="px-4 py-2 text-xl text-customGray bg-white border rounded-md"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="px-4 py-2 text-xl text-customGray bg-white border rounded-md"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-customGray no-underline"
          >
            Signup
          </button>
        </form>
        {success && <p className="text-green">{success}</p>}
        {error && <p className="text-red">{error}</p>}
      </div>
    </div>
  );
}

export default Signup;
