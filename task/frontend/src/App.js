import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  const [page, setPage] = useState("signup");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("signup")}>Signup</button>
        <button onClick={() => setPage("login")}>Login</button>
      </nav>
      <hr />
      {page === "signup" ? <Signup /> : <Login />}
    </div>
  );
}

export default App;
