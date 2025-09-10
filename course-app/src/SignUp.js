import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    const userExists = users.find((user) => user.username === username);

    if (userExists) {
      alert("User already exists! Please login.");
      navigate("/login");
    } else {
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Sign up successful! Please login.");
      navigate("/login");
    }
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center w-screen h-screen bg-[#eddac5]">
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
            <button type="submit" className="text-lg font-mono w-[15%] h-[10%] rounded-md bg-[#374151] text-white hover:bg-white hover:text-[#374151]">Sign Up</button>
        </div>
    </form>
  );
}

export default SignUp;
