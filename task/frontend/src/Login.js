import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";
import NavBar from "./components/navBar";
import { AuthContext } from "./AuthContext"; // ✅ import AuthContext

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ use AuthContext

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // ✅ send credentials with cookies
      const res = await API.post("/auth/login", form, { withCredentials: true });

      setSuccess(`Welcome ${res.data.user.username}`);

      // ✅ store only user (no token in frontend)
      login(res.data.user);

      // ✅ navigate to /task after short delay
      setTimeout(() => {
        navigate("/task");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen bg-customPurple">
      <NavBar className="h-[15%]" />
      <div className="h-[80%] flex flex-col items-center justify-center">
        <h2 className="p-4 text-2xl font-bold font-sans text-customGray">
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
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
            Login
          </button>
        </form>
        {success && <p className="text-green">{success}</p>}
        {error && <p className="text-red">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
