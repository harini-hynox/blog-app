import React, { useState } from "react";
import NavBar from "./components/NavBar";

function Home({ onAddPost, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value); // only call if function exists
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      const newPost = { id: Date.now(), title, body };

      // Get existing posts from localStorage
      const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
      // Add new post
      const updatedPosts = [newPost, ...storedPosts];
      // Save back to localStorage
      localStorage.setItem("posts", JSON.stringify(updatedPosts));

      // Reset form
      setTitle("");
      setBody("");
      setShowNotification(true);

      // Hide after 3s
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  // Load posts from localStorage
  const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

  // Filtered posts based on search term
  const filteredPosts = storedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-screen h-screen gap-8 flex flex-col bg-[#CDD6F6] overflow-y-auto">
      <NavBar className=" w-full h-25% " />

      {/* Notification Popup */}
      {showNotification && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          ✅ Successfully Posted!
        </div>
      )}

      {/* Hero / Banner Section */}
      <section className="h-15% w-full flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold font-sans ">
          Welcome to My Blog App
        </h1>
        <p className="text-lg font-sans">
          Search posts, create your own, and explore content!
        </p>
      </section>

      {/* Search Section */}
      <div className="flex h-[5%] justify-center items-center relative mt-4">
        <input
          type="text"
          placeholder=" Search posts..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-[45%] p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-[28%] text-gray-500 hover:text-red-500"
          >
            ❌
          </button>
        )}
      </div>

      {/* Search Results */}
      {searchTerm && (
        <section className="px-8">
          <h2 className="text-2xl font-bold mb-4">🔍 Search Results</h2>
          {filteredPosts.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <li
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <h3 className="font-bold text-lg text-indigo-600">
                    {post.title}
                  </h3>
                  <p className="text-gray-700">{post.body}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </section>
      )}

      {/* Create Post Section */}
      <section className="flex flex-col items-center w-[100%] h-[40%] gap-2">
        <h2 className="text-3xl font-bold font-sans mb-4">Create a Post</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[50%] h-[80%] items-center gap-6"
        >
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[90%] p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="Post Content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-[90%] h-[80%] p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-400 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
          >
            ➕ Add Post
          </button>
        </form>
      </section>

      {/* Stats Section */}
      <section className="px-8 gap-8 h-[20%] flex  flex-row justify-center items-center grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="flex flex-col justify-center items-center w-[80%] h-[80%] bg-white shadow p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-blue-50">
          <h3 className="text-2xl font-bold text-blue-600">100+</h3>
          <p className="text-gray-600">Posts Available</p>
        </div>
        <div className="flex flex-col justify-center items-center w-[80%] h-[80%] bg-white shadow p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-50">
          <h3 className="text-2xl font-bold text-green-600">50+</h3>
          <p className="text-gray-600">Active Users</p>
        </div>
        <div className="flex flex-col justify-center items-center w-[80%] h-[80%] bg-white shadow p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-purple-50">
          <h3 className="text-2xl font-bold text-purple-600">10+</h3>
          <p className="text-gray-600">Categories</p>
        </div>
        <div className="flex flex-col justify-center items-center w-[80%] h-[80%] bg-white shadow p-4 rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-pink-50">
          <h3 className="text-2xl font-bold text-pink-600">24/7</h3>
          <p className="text-gray-600">Access</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
