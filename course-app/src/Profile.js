import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Navbar from "./components/Navbar";

function Profile() {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  // Store form data for editing
  const [formData, setFormData] = useState({
    username: user?.username || "",
    role: user?.role || "Authorized User",
    email: user?.email || "",
    phone: user?.phone || "",
    interest: user?.interest || "",
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-[#eddac5]">
        <Navbar /> {/* ✅ Navbar shown on guest view */}
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-lg text-center">
          <h2 className="text-xl font-bold">Guest Profile 👤</h2>
          <p className="text-gray-600">You are not logged in.</p>
        </div>
      </div>
    );
  }

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Save updated details
  const handleSave = () => {
    setIsEditing(false);
    console.log("Updated Profile:", formData);
  };

  return (
    <div className="min-h-screen bg-[#eddac5]">
      {/* ✅ Navbar at top */}
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            <span className="text-gray-500">Pic</span>
          </div>

          {/* User Info */}
          <h2 className="text-xl font-bold mt-3">{formData.username}</h2>
          <p className="text-gray-600">{formData.role}</p>

          {/* Edit Button */}
          {!isEditing && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Edit Form */}
        {isEditing && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="text"
              name="interest"
              placeholder="Area of Interest"
              value={formData.interest}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
