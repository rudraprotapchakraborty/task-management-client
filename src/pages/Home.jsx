import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "../components/Column";
import axios from "axios";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [newTask, setNewTask] = useState({ title: "", description: "", category: "To-Do" });
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://task-management-server-production-c1e0.up.railway.app/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to fetch tasks. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Open Add Task Modal
  const openAddTaskModal = () => setShowAddModal(true);
  const closeAddTaskModal = () => setShowAddModal(false);

  // Add Task
  const handleAddTask = async () => {
    if (!newTask.title.trim()) return;

    const taskWithTimestamp = { ...newTask, timestamp: new Date().toISOString() };

    try {
      await axios.post("https://task-management-server-production-c1e0.up.railway.app/tasks", taskWithTimestamp);
      fetchTasks(); // Ensure latest tasks are loaded
      closeAddTaskModal();
    } catch (error) {
      console.error("❌ Error adding task:", error.response?.data || error.message);
    }
  };

  // Open Edit Modal
  const openEditModal = (task) => setEditingTask(task);
  const closeEditModal = () => setEditingTask(null);

  // Update Task
  const handleEdit = async (updatedTask) => {
    try {
      await axios.put(`https://task-management-server-production-c1e0.up.railway.app/tasks/${updatedTask._id}`, updatedTask);
      fetchTasks(); // Fetch latest tasks from backend
      closeEditModal();
    } catch (error) {
      console.error("❌ Error updating task:", error.response?.data || error.message);
    }
  };

  // Open Delete Confirmation
  const openDeleteConfirm = (taskId) => setDeleteConfirm(taskId);
  const closeDeleteConfirm = () => setDeleteConfirm(null);

  // Delete Task
  const handleDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await axios.delete(`https://task-management-server-production-c1e0.up.railway.app/tasks/${deleteConfirm}`);
      fetchTasks(); // Ensure UI updates correctly
      closeDeleteConfirm();
    } catch (error) {
      console.error("❌ Error deleting task:", error.response?.data || error.message);
    }
  };

  // Drag & Drop Handler
  const onDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskToUpdate = tasks.find((task) => task._id === active.id);
    if (!taskToUpdate || taskToUpdate.category === over.id) return;

    try {
      await axios.put(`https://task-management-server-production-c1e0.up.railway.app/tasks/${active.id}`, { category: over.id });
      fetchTasks(); // Ensure UI updates after backend change
    } catch (error) {
      console.error("❌ Error updating task category:", error.response?.data || error.message);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Task Management Board</h1>

        <button onClick={openAddTaskModal} className="px-4 py-2 bg-purple-600 text-white rounded mb-4">
          + Add Task
        </button>

        {loading ? (
          <p className="text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : error ? (
          <p className="text-red-500 dark:text-red-400">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {["To-Do", "In Progress", "Done"].map((category) => (
              <SortableContext
                key={category}
                items={tasks.filter((t) => t.category === category).map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <Column
                  title={category}
                  tasks={tasks.filter((task) => task.category === category)}
                  onEdit={openEditModal}
                  onDelete={openDeleteConfirm}
                />
              </SortableContext>
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add Task</h2>
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-2 border rounded mb-2 bg-white dark:bg-black"
            />
            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-2 border rounded mb-2 bg-white dark:bg-black"
            ></textarea>
            <select
              value={newTask.category}
              onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-black"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="flex justify-end gap-2">
              <button onClick={closeAddTaskModal} className="px-4 py-2 bg-gray-500 text-white rounded">
                Cancel
              </button>
              <button onClick={handleAddTask} className="px-4 py-2 bg-purple-600 text-white rounded">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task Modal */}
      {editingTask && <EditTaskModal task={editingTask} onClose={closeEditModal} onSave={handleEdit} />}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteTaskModal onClose={closeDeleteConfirm} onConfirm={handleDelete} />
      )}
    </DndContext>
  );
};

export default Home;
