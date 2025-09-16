import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className=" w-full flex flex-row items-center justify-between px-6 py-4 bg-customLavender ">
      <h4 className="text-2xl font-bold font-sans text-customGray">Task</h4>

      <div className="flex gap-4 h-[90%]">
        <Link
          to="/"
          className=" px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-customGray no-underline"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className="px-4 py-2 text-xl text-customGray bg-white border rounded-md hover:text-white hover:bg-customGray no-underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
