import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { FaUserCircle } from "react-icons/fa";

const NavBar = ({ page }) => {
  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout(); // Supabase logout handled inside AuthContext
      navigate("/login"); // Navigate after logout
    } catch (err) {
      console.error("❌ Logout failed:", err.message);
    }
  };

  return (
    <nav className="w-full flex flex-row items-center justify-between px-6 py-4 bg-customPurple">
      <h4 className="text-2xl font-bold font-sans text-customGray">Task</h4>

      <div className="flex gap-3 items-center">
        {page === "auth" && (
          <>
            <button
              className="px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-gray-300 no-underline"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-gray-300 no-underline"
              onClick={() => navigate("/")}
            >
              Signup
            </button>
          </>
        )}

                {page === "task" && user && (
          <>
            {/* Profile Icon */}
            <FaUserCircle
              size={35}
              className="text-white cursor-pointer h-auto hover:text-gray-300 "
              onClick={() => navigate("/profile")}
            />

            {/* Logout */}
            <button
              className="px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-gray-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default NavBar;
