import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import NavBar from "./components/navBar";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");   // ❌ Error messages
  const [message, setMessage] = useState(""); // ✅ Success/info messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      console.log("📩 Signup request:", form);

      // 🔹 Use AuthContext signup
      const result = await signup(form.email, form.password, {
        username: form.username,
      });

      // if signup() returned a confirmation message (no session)
      if (result?.message) {
        console.warn("⚠️ Signup requires email confirmation.");
        setMessage(result.message);
        setTimeout(() => navigate("/login"), 2500);
        return;
      }

      console.log("✅ Signup successful, redirecting to tasks...");
      
    } catch (err) {
      console.error("❌ Signup error:", err.message);
      setError(err.message || "Signup failed");
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
            Signup
          </h2>

          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          {message && <p className="text-green-600 text-center mb-3">{message}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
              className={`text-xl text-white bg-customGray border py-2 rounded-lg hover:bg-white hover:text-customGray transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
