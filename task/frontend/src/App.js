import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Task from "./Task";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/task"
          element={
            <PrivateRoute>
              <Task />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
