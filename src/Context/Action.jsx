import React, { useState } from "react";

const Action = (props) => {
  const [isEditingInline, setIsEditingInline] = useState(false);
  const [editedText, setEditedText] = useState(props.selectedTask.text);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [deletedTask, setDeletedTask] = useState(null);

  // Handle Inline Editing
  const handleEditInline = () => {
    props.handleEditTask(editedText);
    setIsEditingInline(false);
  };

  // Handle Delete with Undo
  const handleDelete = () => {
    setDeletedTask(props.selectedTask); // Store the task temporarily
    props.handleDeleteTask();
    setShowSnackbar(true); // Show snackbar
    setTimeout(() => setShowSnackbar(false), 5000); // Auto-hide after 5 seconds
  };

  const undoDelete = () => {
    props.handleEditTask(deletedTask.text); // Re-add deleted task
    setDeletedTask(null);
    setShowSnackbar(false);
  };

  // Priority Badge Styling
  const priorityColors = {
    High: "bg-red-700",
    Medium: "bg-yellow-500",
    Low: "bg-green-500",
  };

  return (
    <div className="mt-4 p-4 bg-sky-300 rounded-lg shadow-md relative">
      {/* Priority Badge */}
      <span
        className={`absolute top-0 right-0 px-2 py-1 text-xs text-white rounded-full ${priorityColors[props.selectedTask.priority]} shadow-lg`}
      >
        {props.selectedTask.priority}
      </span>

      {/* Inline Edit */}
      {isEditingInline ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border p-2 rounded-lg w-full text-red-500"
            onKeyDown={(e) => e.key === "Enter" && handleEditInline()}
          />
          <button
            className="px-3 py-2 bg-yellow-500 text-red-500 rounded-lg hover:bg-yellow-600"
            onClick={handleEditInline}
          >
            Save
          </button>
        </div>
      ) : (
        <p
          className="text-lg font-semibold text-red-500 cursor-pointer"
          onClick={() => setIsEditingInline(true)}
          title="Click to edit task"
        >
          {props.selectedTask.text}
        </p>
      )}

      {/* Action Buttons */}
      <div className="mt-2 flex space-x-2">
        {/* Edit Task */}
        <button
          className="px-4 py-2 bg-red-500 text-yellow-500 rounded-lg hover:bg-red-600 transition"
          onClick={() => props.handleEditTask(prompt("Edit task:", props.selectedTask.text))}
        >
          Edit
        </button>

        {/* Change Priority */}
        <button
          className="px-4 py-2 bg-yellow-500 text-red-500 rounded-lg hover:bg-yellow-600 transition"
          onClick={() =>
            props.handleChangePriority(
              prompt("Enter new priority:", props.selectedTask.priority)
            )
          }
        >
          Change Priority
        </button>

        {/* Delete Task */}
        <button
          className="px-4 py-2 bg-red-500 text-yellow-500 rounded-lg hover:bg-red-600 transition"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>

      {/* Snackbar for Undo */}
      {showSnackbar && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-red-500 text-sm px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4">
          <span>Task deleted!</span>
          <button
            onClick={undoDelete}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Undo
          </button>
        </div>
      )}
    </div>
  );
};

export default Action;
