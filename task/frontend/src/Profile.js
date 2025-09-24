import React, { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { FaArrowLeft } from "react-icons/fa";

const API_BASE = "http://localhost:5000/avatar";

const Profile = () => {
  const navigate = useNavigate();
  const { user, accessToken } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    username: "",
    location: "",
    social: "",
    bio: "",
    avatar_url: "",
  });
  const [editing, setEditing] = useState(false);
  const [hovering, setHovering] = useState(false);

  // ✅ Fetch profile (memoized)
  const fetchProfile = useCallback(async () => {
    if (!accessToken) return;
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const data = await res.json();
      if (res.ok && data.profile) {
        setProfile({
          ...data.profile,
          avatar_url: data.profile.avatar_url
            ? `${data.profile.avatar_url}?t=${Date.now()}`
            : "",
        });
      } else {
        console.error("❌ Profile fetch failed:", data.error);
      }
    } catch (err) {
      console.error("⚠️ Error fetching profile:", err.message);
    }
  }, [accessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ✅ Upload avatar
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !accessToken) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (data.profile) {
        setProfile({
          ...data.profile,
          avatar_url: `${data.profile.avatar_url}?t=${Date.now()}`, // 🔑 force refresh
        });
      }
    } catch (err) {
      console.error("⚠️ Error uploading avatar:", err.message);
    }
  };

  // ✅ Save profile details
  const handleSave = async () => {
    if (!accessToken) return;
    try {
      const body = {
        username: profile.username || "",
        location: profile.location || "",
        social: profile.social || "",
        bio: profile.bio || "",
      };

      const res = await fetch(`${API_BASE}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      if (data.profile) {
        setProfile({
          ...data.profile,
          avatar_url: data.profile.avatar_url
            ? `${data.profile.avatar_url}?t=${Date.now()}`
            : "",
        });
      }

      setEditing(false);
    } catch (err) {
      console.error("⚠️ Error saving profile:", err.message);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-customLavender flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 bg-customPurple">
        <FaArrowLeft
          size={25}
          className="text-white cursor-pointer"
          onClick={() => navigate("/tasks")}
        />
        <h2 className="text-2xl font-bold text-white">
          {profile.username || "User"}
        </h2>
        <div></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-6">
        {/* Profile Card */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          {/* Avatar Upload */}
          <div
            className="relative w-32 h-32 mb-4"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <img
              src={profile.avatar_url || "https://via.placeholder.com/150"}
              alt="profile"
              className="w-32 h-32 bg-gray-300 rounded-full object-cover"
            />
            {hovering && (
              <label className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center cursor-pointer rounded-full">
                Choose
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  accept="image/*"
                />
              </label>
            )}
          </div>

          {/* Edit button */}
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 mb-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {editing ? "Cancel" : "Edit"}
          </button>

          {/* Profile Fields */}
          <div className="flex flex-col gap-3 w-full">
            <input
              type="text"
              value={profile.username || ""}
              disabled={!editing}
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
              className="p-2 border rounded-md"
              placeholder="Username"
            />
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="p-2 border rounded-md bg-gray-100"
            />
            <input
              type="text"
              value={profile.location || ""}
              disabled={!editing}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              className="p-2 border rounded-md"
              placeholder="Location"
            />
            <input
              type="text"
              value={profile.social || ""}
              disabled={!editing}
              onChange={(e) =>
                setProfile({ ...profile, social: e.target.value })
              }
              className="p-2 border rounded-md"
              placeholder="Social Links"
            />
            <textarea
              value={profile.bio || ""}
              disabled={!editing}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="p-2 border rounded-md"
              placeholder="Describe yourself"
            />
          </div>

          {/* Save button */}
          {editing && (
            <button
              onClick={handleSave}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
