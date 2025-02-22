import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash, FaGripVertical } from "react-icons/fa"; // Add FaGripVertical for the handle

const TaskCard = ({ task, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Format the timestamp for display
  const formattedTimestamp = new Date(task.timestamp).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes} // Keep attributes on the main div for accessibility
      className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-3 border border-gray-200 dark:border-gray-700 transition duration-200 hover:shadow-lg flex items-start"
    >
      {/* Drag Handle */}
      <span className="drag-handle cursor-grab mr-2" {...listeners}>
        <FaGripVertical className="text-gray-500" />
      </span>

      {/* Task Content */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800 dark:text-gray-100">{task.title}</h3>
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-500"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{task.description}</p>
        )}

        <span className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded ${getBadgeColor(task.category)}`}>
          {task.category}
        </span>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">🕒 {formattedTimestamp}</p>
      </div>
    </div>
  );
};

// Helper function for badge colors
const getBadgeColor = (category) => {
  switch (category) {
    case "To-Do":
      return "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "In Progress":
      return "bg-purple-200 text-purple-800 dark:bg-purple-700 dark:text-purple-100";
    case "Done":
      return "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

export default TaskCard;