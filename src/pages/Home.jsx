import { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const openEditModal = (task) => setEditingTask(task);
  const openDeleteConfirm = (taskId) => setDeleteConfirm(taskId);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://task-management-server-production-c1e0.up.railway.app/tasks"
      );
      setTasks(res.data);
    } catch {
      setError("Failed to fetch tasks. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Drag & Drop Handler
  const onDragEnd = async (event) => {
    const { active, over } = event;

    // If no 'over' item or dragging over itself, do nothing
    if (!over || active.id === over.id) return;

    // Find indices of active and over tasks in the tasks array
    const activeIndex = tasks.findIndex((t) => t._id === active.id);
    const overIndex = tasks.findIndex((t) => t._id === over.id);

    // Safety check: ensure both tasks exist
    if (activeIndex === -1 || overIndex === -1) return;

    const activeTask = tasks[activeIndex];
    const overTask = tasks[overIndex];

    // Create a new tasks array to avoid mutating state directly
    let newTasks = [...tasks];

    // Check if categories differ (moving between columns)
    if (activeTask.category !== overTask.category) {
      // Update the category of the active task to match the over task's category
      newTasks[activeIndex] = { ...activeTask, category: overTask.category };
    }

    // Reorder the tasks array by moving the active task to the over task's position
    newTasks = arrayMove(newTasks, activeIndex, overIndex);

    // Update the state with the new tasks array
    setTasks(newTasks);

    // If the category changed, update the backend
    if (activeTask.category !== overTask.category) {
      try {
        await axios.put(
          `https://task-management-server-production-c1e0.up.railway.app/tasks/${active.id}`,
          { category: overTask.category }
        );
      } catch (error) {
        console.error(
          "Error updating task category:",
          error.response?.data || error.message
        );
      }
    }
  };

  const addTask = async () => {
    if (!newTask.title.trim()) return alert("Task title cannot be empty.");
  
    try {
      await axios.post(
        "https://task-management-server-production-c1e0.up.railway.app/tasks",
        newTask
      );
  
      setShowAddModal(false); // Close the modal after adding
      setNewTask({ title: "", description: "", category: "To-Do" }); // Reset form
  
      await fetchTasks(); // Immediately refetch tasks from the backend
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };
  

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Task Management Board</h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-purple-600 text-white rounded mb-4"
        >
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
                items={tasks
                  .filter((t) => t.category === category)
                  .map((t) => t._id)}
                strategy={verticalListSortingStrategy}
              >
                <Column
                  title={category}
                  tasks={tasks.filter((task) => task.category === category)}
                  onEdit={openEditModal}
                  onDelete={openDeleteConfirm}
                  data={{ category }} // Pass the category to help in drag detection
                />
              </SortableContext>
            ))}
          </div>
        )}
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={fetchTasks}
        />
      )}

      {deleteConfirm && (
        <DeleteTaskModal
          taskId={deleteConfirm} // Pass the task ID to delete
          onClose={() => setDeleteConfirm(null)}
          onConfirm={fetchTasks} // Refetch tasks after deletion
        />
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold">Add New Task</h2>
            <input
              type="text"
              placeholder="Task Title"
              className="w-full p-2 border rounded mt-3 bg-white dark:bg-gray-700 dark:text-white"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded mt-3 bg-white dark:bg-gray-700 dark:text-white"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <select
              className="w-full p-2 border rounded mt-3 bg-white dark:bg-gray-700 dark:text-white"
              value={newTask.category}
              onChange={(e) =>
                setNewTask({ ...newTask, category: e.target.value })
              }
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </DndContext>
  );
};

export default Home;
