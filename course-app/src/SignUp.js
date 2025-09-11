import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";  // import library

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    // Basic validation
    if (trimmedUsername.length < 3 || trimmedPassword.length < 4) {
      alert("Username must be at least 3 chars and password at least 4 chars.");
      return;
    }

    // Check if username already exists (case insensitive)
    const userExists = users.find(
      (user) => user.username.toLowerCase() === trimmedUsername.toLowerCase()
    );

    if (userExists) {
      alert("User already exists! Please login.");
      navigate("/login");
    } else {
      // Encrypt password
      const encryptedPassword = CryptoJS.AES.encrypt(
        trimmedPassword,
        "secret-key"
      ).toString();

      // Store user with encrypted password
      users.push({ username: trimmedUsername, password: encryptedPassword });
      localStorage.setItem("users", JSON.stringify(users));

      alert("Sign up successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="flex flex-col items-center justify-center w-screen h-screen bg-[#eddac5]"
    >
      <div className="w-[50%] h-[50%] flex flex-col items-center justify-center border-white border-4 border-solid rounded-full">
        <h2 className="text-3xl text-[#374151] font-bold mb-4">Sign Up</h2>
        <input
          type="text"
          placeholder=" Choose username"
          value={username}
          className="text-lg font-mono h-[8%] rounded-md"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder=" Choose password"
          value={password}
          className="text-lg font-mono h-[8%] rounded-md"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button
          type="submit"
          className="text-lg font-mono w-[15%] h-[10%] rounded-md bg-[#374151] text-white hover:bg-white hover:text-[#374151]"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default SignUp;
