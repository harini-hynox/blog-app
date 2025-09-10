import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, token } = useContext(AuthContext);

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-[#FF9E80] text-white">
      {/* Left - Logo */}
      <h2 className="text-3xl font-bold text-[#374151]">LearnHub</h2>

      {/* Middle - Nav Links */}
      <div className="flex gap-8">
        <Link to="/" className=" text-[#374151] text-2xl font-bold no-underline hover:text-gray-200">
          Home
        </Link>
        <Link to="/course" className="text-[#374151] text-2xl font-bold no-underline hover:text-gray-200">
          Courses
        </Link>
      </div>

      {/* Right - Profile & Auth Button */}
      <div className="flex items-center gap-4">
        {/* Profile Icon */}
        <Link to="/profile">
            <FaUserCircle className="w-10 h-10 text-[#374151] text-2xl hover:text-gray-200 cursor-pointer" />
        </Link>


        {/* Auth Button */}
        {token ? (
          <button
            onClick={logout}
            className="bg-[#374151] text-white text-xl px-4 py-1 rounded-md  hover:bg-white hover:text-[#374151]"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="bg-[#374151] text-white text-xl px-4 py-1 rounded-md  hover:bg-white hover:text-[#374151]">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
