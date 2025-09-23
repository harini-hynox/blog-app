import React, { useState, useEffect, useContext } from "react";
import NavBar from "./components/navBar";
import { API, ExternalAPI } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./AuthContext";

const Task = () => {
  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tasks, setTasks] = useState([]);
  const [externalPosts, setExternalPosts] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useContext(AuthContext);

  // ---------------- FETCH TASKS ----------------
  const fetchTasks = async () => {
    if (!user) return;
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err.response?.data || err.message);
      toast.error("Failed to fetch tasks ❌");
    }
  };

  // ---------------- FETCH EXTERNAL POSTS ----------------
  const fetchExternalPosts = async () => {
    try {
      const res = await ExternalAPI.get("/");
      setExternalPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Error fetching external posts:", err.message);
      setExternalPosts([]);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
      fetchExternalPosts();
    }
  }, [user]);

  // ---------------- SEARCH LOGIC ----------------
  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    const externalMatches = externalPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.body?.toLowerCase().includes(search.toLowerCase())
    );

    const taskMatches = tasks.filter(
      (task) =>
        task.title?.toLowerCase().includes(search.toLowerCase()) ||
        task.description?.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults([...externalMatches, ...taskMatches]);
  }, [search, externalPosts, tasks]);

  // ---------------- ADD TASK ----------------
  const handleAddTask = async () => {
    if (!title || !body) return toast.error("Title and Body are required ❌");
    if (!user) return toast.error("Login required ❌");

    try {
      const res = await API.post("/tasks", { title, description: body });
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setBody("");
      toast.success("Task added successfully ✅");
    } catch (err) {
      console.error("❌ Error adding task:", err.response?.data || err.message);
      toast.error("Failed to add task ❌");
    }
  };

  // ---------------- UPDATE TASK ----------------
  const handleUpdateTask = async (id) => {
    if (!user) return toast.error("Login required ❌");
    try {
      const res = await API.put(`/tasks/${id}`, {
        title: editTitle,
        description: editBody,
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data : task))
      );
      setEditingTaskId(null);
      setEditTitle("");
      setEditBody("");
      toast.success("Task updated ✏️");
    } catch (err) {
      console.error("❌ Error updating task:", err.response?.data || err.message);
      toast.error("Failed to update task ❌");
    }
  };

  // ---------------- DELETE TASK ----------------
  const handleDeleteTask = async (id) => {
    if (!user) return toast.error("Login required ❌");
    try {
      await API.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted 🗑️");
    } catch (err) {
      console.error("❌ Error deleting task:", err.response?.data || err.message);
      toast.error("Failed to delete task ❌");
    }
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-semibold">Are you sure you want to delete this task?</p>
          <div className="flex gap-2 mt-3">
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

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-customLavender">
      <NavBar page="task" className="h-[15%]" />

      <div className="px-4 py-6 w-full">
        {/* Search */}
        <div className="flex h-[5%] flex-row items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[40%] p-2 border rounded-md"
          />
        </div>

        {/* Add Task */}
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
            onClick={handleAddTask}
            className="px-4 py-2 text-customGray bg-customPurple rounded-md hover:bg-white"
          >
            Add Task
          </button>
        </div>

        {/* Conditional Rendering */}
        {searchResults.length > 0 ? (
          <div className="mt-6 w-full">
            <h2 className="text-xl font-bold mb-2">Search Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((post) => (
                <div
                  key={post.id || post._id}
                  className="p-4 bg-white rounded-lg shadow-md"
                >
                  <h3 className="font-bold mb-2">{post.title}</h3>
                  <p>{post.body || post.description}</p>
                </div>
              ))}
            </div>
            {searchResults.length === 0 && (
              <p className="text-gray-500">No results found</p>
            )}
          </div>
        ) : (
          <>
            {/* External Posts */}
            <div className="h-[30%]">
              <h2 className="text-xl font-bold mb-2">External Posts</h2>
              <div className="flex overflow-x-auto gap-4 p-4 bg-customPurple rounded-md">
                {externalPosts.length ? (
                  externalPosts.map((post) => (
                    <div
                      key={post.id}
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

            {/* Local Tasks */}
            <div className="h-[20%]">
              <h2 className="text-xl font-bold mt-6 mb-2">Your Tasks</h2>
              <div className="bg-customPurple rounded-md p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                          <p>{task.description}</p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                setEditingTaskId(task._id);
                                setEditTitle(task.title);
                                setEditBody(task.description);
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
          </>
        )}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default Task;
