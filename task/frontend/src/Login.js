import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import NavBar from "./components/navBar";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("📩 Login request:", form);

      // 🔹 Call AuthContext login
      const loggedUser = await login(form.email, form.password);

      console.log("✅ Logged in:", loggedUser);

      // 🚀 Redirect to tasks page
      navigate("/tasks", { replace: true });
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
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
              disabled={loading}
              className={`text-xl text-white border py-2 rounded-lg transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-customGray hover:bg-white hover:text-gray-300"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
