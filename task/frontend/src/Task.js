import React, { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import { API, ExternalAPI } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Task = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [externalPosts, setExternalPosts] = useState([]);

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  // ✅ fetch local tasks from MongoDB
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ fetch external posts
  const fetchExternalPosts = async () => {
    try {
      const res = await ExternalAPI.get("/posts");
      const posts = Array.isArray(res.data)
        ? res.data
        : res.data?.posts || [];
      setExternalPosts(posts);
    } catch (err) {
      console.error("Error fetching external posts:", err);
      setExternalPosts([]);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchExternalPosts();
  }, []);

  // ✅ handle post creation
  const handleAddPost = async () => {
    if (!title || !body) return;
    try {
      const res = await API.post(
        "/tasks",
        { title, body },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setBody("");
      toast.success("Task added successfully ✅");
    } catch (err) {
      console.error("Error adding task:", err.response?.data || err.message);
      toast.error("Failed to add task ❌");
    }
  };

  // ✅ update a task
  const handleUpdateTask = async (id) => {
    try {
      const res = await API.put(
        `/tasks/${id}`,
        { title: editTitle, body: editBody },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      setEditingTaskId(null);
      setEditTitle("");
      setEditBody("");
      toast.success("Task updated successfully ✏️");
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
      toast.error("Failed to update task ❌");
    }
  };

  // ✅ delete confirmation using toast
  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this task?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                handleDeleteTask(id);
                closeToast();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };

  // ✅ delete a task
  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted 🗑️");
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
      toast.error("Failed to delete task ❌");
    }
  };

  // ✅ filter external posts by search
  const filteredPosts = externalPosts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-customPurple">
      <NavBar className="h-[15%]" />
      <div className="px-4 py-6 w-full">
        {/* 🔍 Search bar */}
        <div className="flex h-[5%] flex-row items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[40%] p-2 border rounded-md"
          />
        </div>

        {/* 📝 Post creation form */}
        <div className="flex flex-col h-[30%] items-center mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[35%] p-2 mb-2 border rounded-md"
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-[35%] h-[60%] p-2 mb-2 border rounded-md"
          />
          <button
            onClick={handleAddPost}
            className="px-4 py-2 text-customGray bg-customLavender rounded-md hover:bg-white"
          >
            Add Post
          </button>
        </div>

        {/* 📌 External posts */}
        <div className="h-[30%]">
          <h2 className="text-xl font-bold mb-2">External Posts</h2>
          <div className="flex overflow-x-auto gap-4 p-4 bg-customLavender rounded-md">
            {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id || post._id}
                  className="min-w-[250px] p-4 bg-white rounded-lg shadow-md"
                >
                  <h3 className="font-bold mb-2">{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No external posts found</p>
            )}
          </div>
        </div>

        {/* 📌 Local tasks */}
        <div className="h-[20%]">
          <h2 className="text-xl font-bold mt-6 mb-2">Your Tasks</h2>
          <div className="bg-customLavender rounded-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-2"
                >
                  {editingTaskId === task._id ? (
                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full p-2 border rounded-md mb-2"
                      />
                      <textarea
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        className="w-full p-2 border rounded-md mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateTask(task._id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          className="px-3 py-1 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="font-bold">{task.title}</h3>
                      <p>{task.body}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => {
                            setEditingTaskId(task._id);
                            setEditTitle(task.title);
                            setEditBody(task.body);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(task._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No tasks created yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Task;
