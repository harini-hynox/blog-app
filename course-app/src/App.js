import { Routes , Route } from "react-router-dom";
import Home from './Home.js';
import Course from './Course.js';
import Profile from './Profile.js';
import Login from './Login.js';
import SignUp from "./SignUp.js";
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/course" element={<ProtectedRoute><Course /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
