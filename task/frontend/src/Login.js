import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import API from "./api";
import NavBar from "./components/navBar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    console.log("📩 Login request:", form);

    // ✅ Must match backend prefix
    const res = await API.post("/auth/login", form);

    console.log("✅ Login response:", res.data);

    const accessToken =
      res.data?.accessToken || res.headers["x-access-token"];
    const refreshToken =
      res.data?.refreshToken || res.headers["x-refresh-token"];
    const user = res.data?.user;

    if (!accessToken || !refreshToken || !user) {
      throw new Error("Login failed: Missing tokens or user in response");
    }

    login(user, accessToken, refreshToken);

    console.log("🔑 Saved Access Token:", accessToken);

    navigate("/task");
  } catch (err) {
    console.error("❌ Login error:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Invalid email or password");
  }
};


  return (
    <div>
      <NavBar page="auth" />
      <div className="flex justify-center items-center min-h-screen bg-customLavender">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            Login
          </h2>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="text-xl text-white bg-customGray border py-2 rounded-lg hover:bg-white hover:text-customGray transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
