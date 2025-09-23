import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Task from "./Task";
import Profile from "./Profile";   // ⬅️ import Profile page
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes → accessible only if NOT logged in */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Private routes → accessible only if logged in */}
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Task />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          {/* Catch-all → redirect to signup */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
