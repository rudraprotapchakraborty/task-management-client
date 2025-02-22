import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import FontAwesome icons

const TaskCard = ({ task, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg mb-3 border border-gray-200 dark:border-gray-700 transition duration-200 hover:shadow-lg"
      style={style}
    >
      {/* Task Title */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{task.title}</h3>
        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <FaEdit />
          </button>
          <button onClick={() => onDelete(task._id)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500">
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Task Description */}
      {task.description && <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{task.description}</p>}

      {/* Category Badge */}
      <span className={`inline-block mt-3 text-xs font-semibold px-3 py-1 rounded ${getBadgeColor(task.category)}`}>
        {task.category}
      </span>
    </div>
  );
};

// Function to determine badge color based on category
const getBadgeColor = (category) => {
  switch (category) {
    case "To-Do":
      return "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100";
    case "In Progress":
      return "bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100";
    case "Done":
      return "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100";
    default:
      return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

export default TaskCard;
