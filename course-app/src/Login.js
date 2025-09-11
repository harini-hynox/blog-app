import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import CryptoJS from "crypto-js";

function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.username === username);

    if (user) {
      // Decrypt stored password
      const decryptedPassword = CryptoJS.AES.decrypt(
        user.password,
        "secret-key"
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedPassword === password) {
        login({ username: user.username });
        navigate("/course");
      } else {
        alert("Invalid password.");
      }
    } else {
      alert("User not found. Please sign up first.");
      navigate("/signup");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col items-center justify-center w-screen h-screen bg-[#eddac5]"
    >
      <div className="w-[50%] h-[50%] flex flex-col items-center justify-center border-4 border-solid rounded-full">
        <h2 className="text-3xl text-[#374151] font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder=" Enter username"
          value={username}
          className="text-lg font-mono h-[8%] rounded-md"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder=" Enter password"
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
          Login
        </button>
      </div>
    </form>
  );
}

export default Login;
