// Handles task persistence using the browser's localStorage.
import { tasks } from "./state.js";

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

export function loadTasks() {
  const data = localStorage.getItem("tasks");

  // Return an empty array when no tasks are stored.
  return JSON.parse(data) ?? [];
}