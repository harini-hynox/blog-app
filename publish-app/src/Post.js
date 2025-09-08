import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch API posts
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // Get posts from localStorage
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        // Combine API + stored posts
        setPosts([...storedPosts, ...data]);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-500 p-4">⚠️ Error: {error}</p>;
  }

  // Filtered posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-screen h-screen bg-[#CDD6F6] overflow-y-auto">
      <NavBar className="h-[25%]" />

      {/* Search Section */}
      <div className="flex justify-center items-center py-6">
        <input
          type="text"
          placeholder=" Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[50%] p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="ml-2 text-gray-500 hover:text-red-500"
          >
            ❌
          </button>
        )}
      </div>

      {/* Posts List */}
      <div className="flex flex-col items-center">
        <div className="w-[80%] md:w-[60%] lg:w-[50%] p-6">
          {searchTerm ? (
            <>
              <h2 className="text-2xl font-bold mb-4"> Search Results</h2>
              {filteredPosts.length > 0 ? (
                <ul className="space-y-4">
                  {filteredPosts.map((post) => (
                    <li
                      key={post.id}
                      className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
                    >
                      <h3 className="text-xl font-semibold text-blue-600 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-700">{post.body}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No results found.</p>
              )}
            </>
          ) : (
            <ul className="space-y-4">
              {posts.slice(0, 10).map((post) => (
                <li
                  key={post.id}
                  className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700">{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Posts;
