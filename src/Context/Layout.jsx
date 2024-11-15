import React, { useState } from "react";
import Action from "./Action";

function Layout(props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-sky-300 p-4 rounded-lg border border-blue-400 shadow-sm">
      {/* Header with Priority Level and Task Count */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-primary font-bold text-blue-800">
          {props.level} Priority
        </h2>
        <span className="text-sm text-blue-600">
          {props.getTasksByPriority(props.level).length} tasks
        </span>
        <button
          className="text-sm text-blue-900 underline focus:outline-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Hide" : "Show"}
        </button>
      </div>

      {/* Task List */}
      {isExpanded && (
        <div className="space-y-3">
          {props.getTasksByPriority(props.level).map((task, index) => (
            <div
              key={index}
              className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Task Text */}
              <p
                className="text-base font-secondary cursor-pointer text-gray-800 hover:text-blue-700"
                onClick={() => props.setSelectedTask(task)}
              >
                - {task.text}
              </p>

              {/* Action Buttons */}
              {props.selectedTask === task && (
                <Action
                  priority={props.level}
                  handleEditTask={props.handleEditTask}
                  handleChangePriority={props.handleChangePriority}
                  handleDeleteTask={props.handleDeleteTask}
                  selectedTask={props.selectedTask}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Layout;
