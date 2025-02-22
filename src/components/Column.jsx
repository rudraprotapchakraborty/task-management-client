import TaskCard from "./TaskCard";

const Column = ({ title, tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 w-72 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="font-semibold text-lg text-gray-700 dark:text-gray-100 uppercase mb-3 tracking-wide">
        {title}
      </h2>

      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-gray-400 dark:text-gray-400 text-sm italic text-center">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Column;
