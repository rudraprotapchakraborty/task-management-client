const DeleteTaskModal = ({ onClose, onConfirm }) => {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteTaskModal;
  