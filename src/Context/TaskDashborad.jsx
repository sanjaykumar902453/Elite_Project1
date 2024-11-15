import React, { useEffect, useState } from "react";
import Layout from "./Layout";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("High");
  const [selectedTask, setSelectedTask] = useState(null);

  // Load and Save tasks in Local Storage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleTaskSubmit = () => {
    if (textInput.trim() === "") {
      return;
    }
    const newTask = {
      text: textInput,
      priority: selectedPriority,
    };

    setTasks([...tasks, newTask]);
    setTextInput("");
    setSelectedPriority("High");
  };

  const getTasksByPriority = (priority) => {
    return tasks.filter((task) => task.priority === priority);
  };

  const handleEditTask = (editedText) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, text: editedText } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleChangePriority = (newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task === selectedTask ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task !== selectedTask);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };

  return (
    <div className="p-6 lg:p-12 bg-gradient-to-r from-sky-200 to-blue-300 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold text-blue-800 mb-6 text-center">
        Task Dashboard
      </h1>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        <input
          type="text"
          value={textInput}
          onChange={handleTextInputChange}
          className="w-full md:w-96 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter a task..."
        />
        <select
          value={selectedPriority}
          onChange={handlePriorityChange}
          className="w-full md:w-auto border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <button
          onClick={handleTaskSubmit}
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      {/* Task Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-gradient-to-r from-red-200 to-pink-300 rounded-lg shadow-lg">
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="High"
          />
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-200 to-orange-300 rounded-lg shadow-lg">
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Medium"
          />
        </div>
        <div className="p-4 bg-gradient-to-r from-green-200 to-teal-300 rounded-lg shadow-lg">
          <Layout
            getTasksByPriority={getTasksByPriority}
            setSelectedTask={setSelectedTask}
            selectedTask={selectedTask}
            handleEditTask={handleEditTask}
            handleChangePriority={handleChangePriority}
            handleDeleteTask={handleDeleteTask}
            level="Low"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
