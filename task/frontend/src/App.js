import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Task from "./Task";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { AuthProvider, AuthContext } from "./AuthContext";
// import { useContext } from "react";

// 🔹 Private Route → only for logged-in users
// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p>Loading...</p>;
//   return user ? children : <Navigate to="/login" replace />;
// };

// // 🔹 Public Route → only for non-logged-in users
// const PublicRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) return <p>Loading...</p>;
//   return !user ? children : <Navigate to="/tasks" replace />;
// };

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

          {/* Catch-all → redirect to signup */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
